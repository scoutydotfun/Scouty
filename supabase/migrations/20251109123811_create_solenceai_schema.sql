/*
  # SolenceAi Database Schema

  ## Overview
  Complete database schema for SolenceAi - AI-powered Solana wallet security analysis platform

  ## New Tables

  ### 1. `wallet_scans`
  Stores all wallet security scan results
  - `id` (uuid, primary key) - Unique scan identifier
  - `wallet_address` (text, indexed) - Solana wallet address
  - `risk_score` (integer) - 0-100 risk score
  - `risk_level` (text) - LOW/MEDIUM/HIGH classification
  - `transaction_count` (integer) - Number of transactions
  - `wallet_age_days` (integer) - Age of wallet in days
  - `token_diversity` (integer) - Number of unique tokens
  - `total_value_usd` (numeric) - Total portfolio value in USD
  - `ai_summary` (text) - AI-generated analysis summary
  - `ai_findings` (jsonb) - Detailed findings array
  - `metadata` (jsonb) - Additional scan metadata
  - `is_public` (boolean) - Whether scan is shared publicly
  - `scan_ip` (text) - IP address of scanner (for rate limiting)
  - `created_at` (timestamptz) - Scan timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `payment_transactions`
  Logs all payment transactions processed through SolenceAiPay
  - `id` (uuid, primary key) - Unique transaction identifier
  - `sender_wallet` (text) - Sender's wallet address
  - `recipient_wallet` (text) - Recipient's wallet address
  - `amount_sol` (numeric) - Amount in SOL
  - `recipient_risk_score` (integer) - Risk score at time of payment
  - `transaction_signature` (text, unique) - Solana transaction signature
  - `status` (text) - pending/completed/failed/cancelled
  - `error_message` (text, nullable) - Error details if failed
  - `created_at` (timestamptz) - Transaction creation time

  ### 3. `user_profiles`
  Tracks user activity and preferences
  - `id` (uuid, primary key) - Unique user identifier
  - `wallet_address` (text, unique) - User's wallet address
  - `total_scans` (integer) - Total scans performed
  - `total_payments` (integer) - Total payments made
  - `last_scan_at` (timestamptz) - Last scan timestamp
  - `last_payment_at` (timestamptz) - Last payment timestamp
  - `preferences` (jsonb) - User preferences
  - `created_at` (timestamptz) - Account creation time
  - `updated_at` (timestamptz) - Last update time

  ### 4. `rate_limits`
  Manages API rate limiting per wallet/IP
  - `id` (uuid, primary key) - Unique rate limit record
  - `identifier` (text, indexed) - Wallet address or IP
  - `identifier_type` (text) - 'wallet' or 'ip'
  - `endpoint` (text) - API endpoint being limited
  - `request_count` (integer) - Number of requests in window
  - `window_start` (timestamptz) - Start of rate limit window
  - `window_end` (timestamptz) - End of rate limit window
  - `created_at` (timestamptz) - Record creation time

  ## Security
  - RLS enabled on all tables
  - Public read access for public wall
  - Authenticated users can view own data
  - Service role for backend operations

  ## Indexes
  - Wallet address indexes for fast lookups
  - Timestamp indexes for chronological queries
  - Composite indexes for common query patterns
*/

-- Create wallet_scans table
CREATE TABLE IF NOT EXISTS wallet_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text NOT NULL,
  risk_score integer NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_level text NOT NULL CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH')),
  transaction_count integer DEFAULT 0,
  wallet_age_days integer DEFAULT 0,
  token_diversity integer DEFAULT 0,
  total_value_usd numeric(20, 2) DEFAULT 0,
  ai_summary text,
  ai_findings jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  is_public boolean DEFAULT false,
  scan_ip text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payment_transactions table
CREATE TABLE IF NOT EXISTS payment_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_wallet text NOT NULL,
  recipient_wallet text NOT NULL,
  amount_sol numeric(20, 9) NOT NULL,
  recipient_risk_score integer,
  transaction_signature text UNIQUE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text UNIQUE NOT NULL,
  total_scans integer DEFAULT 0,
  total_payments integer DEFAULT 0,
  last_scan_at timestamptz,
  last_payment_at timestamptz,
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create rate_limits table
CREATE TABLE IF NOT EXISTS rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL,
  identifier_type text NOT NULL CHECK (identifier_type IN ('wallet', 'ip')),
  endpoint text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamptz DEFAULT now(),
  window_end timestamptz DEFAULT now() + interval '1 hour',
  created_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_wallet_scans_address ON wallet_scans(wallet_address);
CREATE INDEX IF NOT EXISTS idx_wallet_scans_created_at ON wallet_scans(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_wallet_scans_public ON wallet_scans(is_public, created_at DESC) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_wallet_scans_risk_level ON wallet_scans(risk_level);

CREATE INDEX IF NOT EXISTS idx_payment_transactions_sender ON payment_transactions(sender_wallet);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_recipient ON payment_transactions(recipient_wallet);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_signature ON payment_transactions(transaction_signature);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_created_at ON payment_transactions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_profiles_wallet ON user_profiles(wallet_address);

CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier ON rate_limits(identifier, endpoint);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON rate_limits(window_end);

-- Enable Row Level Security
ALTER TABLE wallet_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- RLS Policies for wallet_scans
CREATE POLICY "Public scans are viewable by everyone"
  ON wallet_scans
  FOR SELECT
  USING (is_public = true);

CREATE POLICY "Users can view own scans"
  ON wallet_scans
  FOR SELECT
  USING (scan_ip = current_setting('request.headers')::json->>'x-forwarded-for');

CREATE POLICY "Service role can insert scans"
  ON wallet_scans
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update scans"
  ON wallet_scans
  FOR UPDATE
  USING (true);

-- RLS Policies for payment_transactions
CREATE POLICY "Users can view own payment transactions"
  ON payment_transactions
  FOR SELECT
  USING (
    sender_wallet = current_setting('request.jwt.claims', true)::json->>'wallet_address'
    OR recipient_wallet = current_setting('request.jwt.claims', true)::json->>'wallet_address'
  );

CREATE POLICY "Service role can insert payment transactions"
  ON payment_transactions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update payment transactions"
  ON payment_transactions
  FOR UPDATE
  USING (true);

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  USING (wallet_address = current_setting('request.jwt.claims', true)::json->>'wallet_address');

CREATE POLICY "Service role can manage user profiles"
  ON user_profiles
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- RLS Policies for rate_limits
CREATE POLICY "Service role can manage rate limits"
  ON rate_limits
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_wallet_scans_updated_at
  BEFORE UPDATE ON wallet_scans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to clean up expired rate limits
CREATE OR REPLACE FUNCTION cleanup_expired_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits WHERE window_end < now() - interval '1 hour';
END;
$$ LANGUAGE plpgsql;
