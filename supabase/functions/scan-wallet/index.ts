import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "npm:@solana/web3.js@1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface WalletData {
  balance: number;
  transactionCount: number;
  accountAge: number;
  tokens: any[];
}

async function fetchWalletData(walletAddress: string): Promise<WalletData> {
  const rpcUrl = Deno.env.get("SOLANA_RPC_URL") || "https://api.mainnet-beta.solana.com";
  const connection = new Connection(rpcUrl, "confirmed");

  try {
    const publicKey = new PublicKey(walletAddress);

    const balance = await connection.getBalance(publicKey);

    const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 1000 });
    const transactionCount = signatures.length;

    let accountAge = 0;
    if (signatures.length > 0) {
      const oldestSignature = signatures[signatures.length - 1];
      if (oldestSignature.blockTime) {
        const creationTime = oldestSignature.blockTime * 1000;
        accountAge = Math.floor((Date.now() - creationTime) / (1000 * 60 * 60 * 24));
      }
    }

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
    });

    const tokens = tokenAccounts.value.map(account => ({
      mint: account.account.data.parsed.info.mint,
      amount: account.account.data.parsed.info.tokenAmount.uiAmount,
    }));

    return {
      balance: balance / LAMPORTS_PER_SOL,
      transactionCount,
      accountAge,
      tokens,
    };
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw new Error("Failed to fetch wallet data");
  }
}

function calculateRiskScore(walletData: WalletData): {
  score: number;
  risk_level: string;
  analysis: any;
} {
  const analysis = {
    transaction_history: { score: 0, weight: 30 },
    wallet_age: { score: 0, weight: 20 },
    token_diversity: { score: 0, weight: 15 },
    activity_patterns: { score: 0, weight: 15 },
    protocol_interactions: { score: 0, weight: 10 },
    balance_health: { score: 0, weight: 10 },
  };

  if (walletData.transactionCount > 500) {
    analysis.transaction_history.score = 30;
  } else if (walletData.transactionCount > 100) {
    analysis.transaction_history.score = 25;
  } else if (walletData.transactionCount > 20) {
    analysis.transaction_history.score = 20;
  } else {
    analysis.transaction_history.score = 10;
  }

  if (walletData.accountAge > 365) {
    analysis.wallet_age.score = 20;
  } else if (walletData.accountAge > 180) {
    analysis.wallet_age.score = 16;
  } else if (walletData.accountAge > 90) {
    analysis.wallet_age.score = 12;
  } else {
    analysis.wallet_age.score = 8;
  }

  const tokenCount = walletData.tokens.length;
  if (tokenCount > 10) {
    analysis.token_diversity.score = 15;
  } else if (tokenCount > 5) {
    analysis.token_diversity.score = 12;
  } else if (tokenCount > 2) {
    analysis.token_diversity.score = 9;
  } else {
    analysis.token_diversity.score = 5;
  }

  analysis.activity_patterns.score = Math.min(15, Math.floor(walletData.transactionCount / 50));
  analysis.protocol_interactions.score = Math.min(10, Math.floor(tokenCount / 2));

  if (walletData.balance > 10) {
    analysis.balance_health.score = 10;
  } else if (walletData.balance > 1) {
    analysis.balance_health.score = 8;
  } else if (walletData.balance > 0.1) {
    analysis.balance_health.score = 6;
  } else {
    analysis.balance_health.score = 3;
  }

  const totalScore = Object.values(analysis).reduce((sum, item) => sum + item.score, 0);

  let risk_level = "LOW";
  if (totalScore < 50) {
    risk_level = "HIGH";
  } else if (totalScore < 75) {
    risk_level = "MEDIUM";
  }

  return {
    score: totalScore,
    risk_level,
    analysis,
  };
}

function generateFindings(walletData: WalletData, riskScore: number): string[] {
  const findings: string[] = [];

  if (walletData.transactionCount > 100) {
    findings.push("Regular transaction activity detected");
  } else if (walletData.transactionCount < 10) {
    findings.push("Limited transaction history");
  }

  if (walletData.accountAge > 180) {
    findings.push("Established wallet with long history");
  } else if (walletData.accountAge < 30) {
    findings.push("Recently created wallet");
  }

  if (walletData.tokens.length > 5) {
    findings.push("Diversified token holdings");
  } else if (walletData.tokens.length === 0) {
    findings.push("No token holdings detected");
  }

  if (riskScore >= 75) {
    findings.push("No high-risk patterns detected");
  } else if (riskScore < 50) {
    findings.push("Multiple risk indicators present");
  }

  return findings;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { wallet, is_public = false } = await req.json();

    if (!wallet) {
      return new Response(
        JSON.stringify({ error: "Wallet address is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const walletData = await fetchWalletData(wallet);

    const { score, risk_level, analysis } = calculateRiskScore(walletData);

    const findings = generateFindings(walletData, score);

    const ai_summary = `This wallet has ${walletData.transactionCount} transactions over ${walletData.accountAge} days with a balance of ${walletData.balance.toFixed(4)} SOL. Risk assessment: ${risk_level}.`;

    const metadata = {
      total_value_usd: walletData.balance * 150,
      transaction_count: walletData.transactionCount,
      wallet_age_days: walletData.accountAge,
      token_count: walletData.tokens.length,
      nft_count: 0,
    };

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    const scanIp = req.headers.get("x-forwarded-for") || "unknown";

    const { error: dbError } = await supabase.from("wallet_scans").insert({
      wallet_address: wallet,
      risk_score: score,
      risk_level,
      transaction_count: walletData.transactionCount,
      wallet_age_days: walletData.accountAge,
      token_diversity: walletData.tokens.length,
      total_value_usd: metadata.total_value_usd,
      ai_summary,
      ai_findings: findings,
      metadata,
      is_public: is_public,
      scan_ip: scanIp,
    });

    if (dbError) {
      console.error("Database error:", dbError);
    }

    const response = {
      score,
      risk_level,
      wallet_address: wallet,
      analysis,
      metadata,
      ai_summary,
      findings,
    };

    return new Response(JSON.stringify(response), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
