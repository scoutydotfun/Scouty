import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WalletScan = {
  id: string;
  wallet_address: string;
  risk_score: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  transaction_count: number;
  wallet_age_days: number;
  token_diversity: number;
  total_value_usd: number;
  ai_summary: string | null;
  ai_findings: string[];
  metadata: Record<string, any>;
  is_public: boolean;
  scan_ip: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentTransaction = {
  id: string;
  sender_wallet: string;
  recipient_wallet: string;
  amount_sol: number;
  recipient_risk_score: number | null;
  transaction_signature: string | null;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  error_message: string | null;
  created_at: string;
};

export type UserProfile = {
  id: string;
  wallet_address: string;
  total_scans: number;
  total_payments: number;
  last_scan_at: string | null;
  last_payment_at: string | null;
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
};
