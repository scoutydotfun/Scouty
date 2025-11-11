import { supabase } from './supabase';

export interface ScanResult {
  score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  wallet_address: string;
  analysis: {
    transaction_history: { score: number; weight: number };
    wallet_age: { score: number; weight: number };
    token_diversity: { score: number; weight: number };
    activity_patterns: { score: number; weight: number };
    protocol_interactions: { score: number; weight: number };
    balance_health: { score: number; weight: number };
  };
  metadata: {
    total_value_usd: number;
    transaction_count: number;
    wallet_age_days: number;
    token_count: number;
    nft_count: number;
  };
  ai_summary: string;
  findings: string[];
}

export async function scanWallet(walletAddress: string, isPublic = false): Promise<ScanResult> {
  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/scan-wallet`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ wallet: walletAddress, is_public: isPublic }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to scan wallet');
  }

  return response.json();
}

export async function getPublicScans(limit = 50) {
  const { data, error } = await supabase
    .from('wallet_scans')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getUserScans(walletAddress: string) {
  const { data, error } = await supabase
    .from('wallet_scans')
    .select('*')
    .eq('wallet_address', walletAddress)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getUserProfile(walletAddress: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('wallet_address', walletAddress)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getUserTransactions(walletAddress: string) {
  const { data, error } = await supabase
    .from('payment_transactions')
    .select('*')
    .or(`sender_wallet.eq.${walletAddress},recipient_wallet.eq.${walletAddress}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export function subscribeToPublicScans(callback: (scan: any) => void) {
  return supabase
    .channel('public-scans')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'wallet_scans',
        filter: 'is_public=eq.true',
      },
      (payload) => callback(payload.new)
    )
    .subscribe();
}

export interface ContractAddress {
  id: string;
  token_address: string;
  network: string;
  label: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getActiveContractAddress(): Promise<ContractAddress | null> {
  const { data, error } = await supabase
    .from('contract_addresses')
    .select('*')
    .eq('is_active', true)
    .eq('network', 'SOLANA')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching contract address:', error);
    return null;
  }

  return data;
}
