# SolenceAi - Technical Architecture & Implementation Plan

## Executive Summary
Building a production-ready Solana dApp for AI-powered wallet security analysis with payment protection, deployed on Solana mainnet.

## 1. System Architecture

### 1.1 High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                  │
│  ┌────────────┬──────────────┬────────────┬───────────────┐ │
│  │ SolenceAi  │  Playground  │    Wall    │  Wallet       │ │
│  │    Pay     │     (API)    │  (Public)  │  Connection   │ │
│  └────────────┴──────────────┴────────────┴───────────────┘ │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend Services Layer                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Supabase Edge Functions (Deno)               │ │
│  │  • Wallet Scan API    • Payment Processing             │ │
│  │  • Risk Analysis      • Badge Verification             │ │
│  │  • Public Feed        • Real-time WebSocket            │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
┌───────────────────────────┐   ┌─────────────────────────┐
│   Supabase PostgreSQL     │   │   Solana Mainnet        │
│   • Scan History          │   │   • Wallet Data         │
│   • User Profiles         │   │   • Token Balances      │
│   • Public Wall Feed      │   │   • Transaction History │
│   • Rate Limiting         │   │   • SPL Tokens          │
└───────────────────────────┘   └─────────────────────────┘
                                          │
                                          ▼
                                ┌─────────────────────┐
                                │   External APIs     │
                                │   • OpenAI API      │
                                │   • Helius RPC      │
                                │   • Jupiter API     │
                                └─────────────────────┘
```

### 1.2 Technology Stack

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- @solana/wallet-adapter-react (wallet integration)
- @solana/web3.js (blockchain interaction)
- Lucide React (icons)

**Backend:**
- Supabase Edge Functions (Deno runtime)
- PostgreSQL (Supabase)
- Row Level Security (RLS)

**Blockchain:**
- Solana Mainnet
- Phantom, Solflare, Backpack wallet support
- SPL Token program

**APIs & Services:**
- OpenAI GPT-4 (AI analysis)
- Helius RPC (enhanced Solana data)
- Jupiter Aggregator (token pricing)

## 2. Database Schema

### 2.1 Tables

**wallet_scans**
```sql
- id: uuid (primary key)
- wallet_address: text (indexed)
- risk_score: integer (0-100)
- risk_level: text (LOW/MEDIUM/HIGH)
- transaction_count: integer
- wallet_age_days: integer
- token_diversity: integer
- total_value_usd: decimal
- ai_summary: text
- ai_findings: jsonb
- metadata: jsonb
- is_public: boolean (for public wall)
- created_at: timestamptz
- updated_at: timestamptz
```

**payment_transactions**
```sql
- id: uuid (primary key)
- sender_wallet: text
- recipient_wallet: text
- amount_sol: decimal
- recipient_risk_score: integer
- transaction_signature: text (unique)
- status: text (pending/completed/failed)
- created_at: timestamptz
```

**user_profiles**
```sql
- id: uuid (primary key)
- wallet_address: text (unique)
- total_scans: integer
- last_scan_at: timestamptz
- created_at: timestamptz
```

**rate_limits**
```sql
- id: uuid (primary key)
- wallet_address: text
- endpoint: text
- request_count: integer
- window_start: timestamptz
- created_at: timestamptz
```

## 3. Core Features Implementation

### 3.1 Wallet Connection
**Libraries:**
- @solana/wallet-adapter-react
- @solana/wallet-adapter-wallets
- @solana/wallet-adapter-react-ui

**Supported Wallets:**
- Phantom
- Solflare
- Backpack
- Ledger

**Implementation:**
```typescript
// Context provider wraps app
<WalletProvider wallets={wallets}>
  <WalletModalProvider>
    <App />
  </WalletModalProvider>
</WalletProvider>
```

### 3.2 Wallet Scanning API

**Endpoint:** `/functions/v1/scan-wallet`

**Request:**
```json
{
  "wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
}
```

**Response:**
```json
{
  "score": 85,
  "risk_level": "LOW",
  "wallet_address": "7xKX...",
  "analysis": {
    "transaction_history": { "score": 28, "weight": 30 },
    "wallet_age": { "score": 18, "weight": 20 },
    "token_diversity": { "score": 13, "weight": 15 },
    "activity_patterns": { "score": 12, "weight": 15 },
    "protocol_interactions": { "score": 8, "weight": 10 },
    "balance_health": { "score": 9, "weight": 10 }
  },
  "metadata": {
    "total_value_usd": 1247.93,
    "transaction_count": 342,
    "wallet_age_days": 287,
    "token_count": 15,
    "nft_count": 3
  },
  "ai_summary": "This wallet demonstrates healthy trading patterns...",
  "findings": [
    "Regular transaction activity",
    "Diversified token holdings",
    "No suspicious patterns detected"
  ]
}
```

**Risk Scoring Algorithm:**
```typescript
function calculateRiskScore(walletData) {
  const scores = {
    transactionHistory: analyzeTransactions(walletData.transactions),
    walletAge: calculateAgeScore(walletData.created_at),
    tokenDiversity: calculateDiversityScore(walletData.tokens),
    activityPatterns: analyzeActivityPatterns(walletData.transactions),
    protocolInteractions: analyzeProtocols(walletData.interactions),
    balanceHealth: analyzeBalanceHealth(walletData.balances)
  };

  const weights = {
    transactionHistory: 0.30,
    walletAge: 0.20,
    tokenDiversity: 0.15,
    activityPatterns: 0.15,
    protocolInteractions: 0.10,
    balanceHealth: 0.10
  };

  return Object.entries(scores).reduce((total, [key, score]) => {
    return total + (score * weights[key]);
  }, 0);
}
```

### 3.3 AI-Powered Analysis

**OpenAI Integration:**
```typescript
async function generateAIAnalysis(walletData, riskScore) {
  const prompt = `
    Analyze this Solana wallet and provide security insights:

    Risk Score: ${riskScore}/100
    Total Transactions: ${walletData.transactionCount}
    Wallet Age: ${walletData.walletAgeDays} days
    Total Value: $${walletData.totalValueUSD}
    Token Holdings: ${walletData.tokenCount} tokens

    Provide:
    1. Brief summary (2-3 sentences)
    2. Key findings (3-5 bullet points)
    3. Risk factors (if any)
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 500
  });

  return response.choices[0].message.content;
}
```

### 3.4 SolenceAiPay - Payment Protection

**Flow:**
1. User enters recipient wallet address
2. System automatically scans recipient wallet
3. Display risk score and AI analysis
4. User reviews security assessment
5. User approves/rejects transaction
6. If approved, transaction executes on Solana

**Implementation:**
```typescript
async function protectedPayment(sender, recipient, amount) {
  // 1. Scan recipient wallet
  const riskAnalysis = await scanWallet(recipient);

  // 2. Show warning if high risk
  if (riskAnalysis.risk_level === 'HIGH') {
    await showRiskWarning(riskAnalysis);
  }

  // 3. User confirms
  const confirmed = await getUserConfirmation();
  if (!confirmed) return;

  // 4. Execute Solana transaction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: new PublicKey(recipient),
      lamports: amount * LAMPORTS_PER_SOL
    })
  );

  const signature = await sendTransaction(transaction, connection);

  // 5. Log transaction
  await logPaymentTransaction({
    sender,
    recipient,
    amount,
    risk_score: riskAnalysis.score,
    signature
  });

  return signature;
}
```

### 3.5 Public Wall Feed

**Real-time Feed:**
- Users can opt-in to share scans publicly
- Wallet addresses are anonymized (first 6 + last 4 chars)
- Real-time updates using Supabase Realtime
- Display latest 50 scans

**Implementation:**
```typescript
// Subscribe to public scans
const subscription = supabase
  .channel('public-scans')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'wallet_scans',
    filter: 'is_public=eq.true'
  }, (payload) => {
    addScanToFeed(payload.new);
  })
  .subscribe();
```

## 4. Security Considerations

### 4.1 Rate Limiting
- Free tier: 100 requests/hour per IP
- Authenticated: 1000 requests/hour per wallet
- Implemented via Supabase Edge Functions

### 4.2 Data Privacy
- Wallet addresses are public blockchain data
- AI analysis results cached for 1 hour
- Users can delete their scan history
- Public wall uses anonymized addresses

### 4.3 Transaction Security
- All transactions require explicit user approval
- Display clear risk warnings
- No custody of user funds
- Open-source code for transparency

## 5. Implementation Timeline

### Phase 1: Foundation (Week 1-2)
- ✅ Set up project structure
- ✅ Implement UI pages (SolenceAiPay, Playground, Wall)
- ✅ Header navigation and routing
- ⏳ Database schema and migrations
- ⏳ Wallet adapter integration

### Phase 2: Core Features (Week 3-4)
- ⏳ Wallet scanning API
- ⏳ Risk scoring algorithm
- ⏳ OpenAI integration
- ⏳ Helius RPC integration
- ⏳ Public wall feed

### Phase 3: Payment Flow (Week 5)
- ⏳ SolenceAiPay transaction logic
- ⏳ Risk warning UI
- ⏳ Transaction execution
- ⏳ Transaction logging

### Phase 4: Polish & Testing (Week 6)
- ⏳ Error handling
- ⏳ Loading states
- ⏳ Mobile responsive
- ⏳ Integration testing
- ⏳ Mainnet deployment

### Phase 5: Production Launch (Week 7)
- ⏳ Security audit
- ⏳ Performance optimization
- ⏳ Documentation
- ⏳ Mainnet launch

## 6. Development Checklist

### Infrastructure
- [x] Project setup with Vite + React + TypeScript
- [x] TailwindCSS configuration
- [x] Supabase project initialized
- [ ] Environment variables configured
- [ ] Wallet adapter installed and configured

### Database
- [ ] Create wallet_scans table
- [ ] Create payment_transactions table
- [ ] Create user_profiles table
- [ ] Create rate_limits table
- [ ] Set up RLS policies
- [ ] Create indexes for performance

### Edge Functions
- [ ] scan-wallet function
- [ ] analyze-risk function
- [ ] process-payment function
- [ ] public-feed function
- [ ] rate-limiter middleware

### Frontend Components
- [x] Header with wallet connect
- [x] SolenceAiPay page
- [x] Playground page
- [x] Wall page
- [ ] Wallet connection modal
- [ ] Risk score display component
- [ ] Transaction confirmation modal
- [ ] Loading states
- [ ] Error boundaries

### Integration
- [ ] Solana Web3.js connection
- [ ] Wallet adapter hooks
- [ ] Helius RPC client
- [ ] OpenAI client
- [ ] Supabase client

### Testing
- [ ] Unit tests for risk scoring
- [ ] Integration tests for API
- [ ] E2E tests for payment flow
- [ ] Security testing
- [ ] Performance testing

## 7. API Keys & Configuration

### Required API Keys
```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Solana
VITE_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
VITE_HELIUS_API_KEY=your_helius_key

# Edge Functions Only
OPENAI_API_KEY=your_openai_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 8. Deployment Strategy

### Mainnet Deployment
1. Test thoroughly on devnet
2. Deploy to mainnet-beta
3. Start with limited beta users
4. Monitor transaction success rates
5. Gradually increase user base
6. Implement monitoring and alerts

### Monitoring
- Transaction success/failure rates
- API response times
- Error rates
- User wallet connections
- Scan request volume

## 9. Future Enhancements

### Short-term
- WebSocket real-time scanning
- Batch wallet scanning
- Historical trend analysis
- Advanced filtering options

### Long-term
- On-chain safety badges (NFTs)
- Multi-chain support (Ethereum, etc.)
- DAO governance for risk parameters
- Mobile app (React Native)
- Browser extension

## 10. Cost Estimates

### Monthly Operating Costs (1000 active users)
- Supabase Pro: $25/month
- OpenAI API: ~$50-100/month (based on usage)
- Helius RPC: $50/month (Professional tier)
- Domain & Hosting: $15/month
- **Total: ~$140-190/month**

### Scaling Considerations
- Cache frequently scanned wallets
- Implement rate limiting
- Use batch processing for AI analysis
- CDN for static assets
- Database query optimization
