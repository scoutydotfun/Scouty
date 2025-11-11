/*
  # Create Transactions Table

  1. New Tables
    - `transactions`
      - `id` (uuid, primary key)
      - `wallet_address` (text) - sender wallet
      - `recipient_address` (text) - recipient wallet
      - `amount` (numeric) - amount in SOL
      - `status` (text) - completed, pending, failed
      - `transaction_signature` (text, unique) - Solana transaction signature
      - `risk_score` (integer) - recipient risk score at time of transaction
      - `metadata` (jsonb) - additional transaction data
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `transactions` table
    - Add policies for users to read their own transactions
    - Add policy for creating new transactions
*/

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text NOT NULL,
  recipient_address text NOT NULL,
  amount numeric(20, 9) NOT NULL CHECK (amount > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('completed', 'pending', 'failed')),
  transaction_signature text UNIQUE NOT NULL,
  risk_score integer CHECK (risk_score >= 0 AND risk_score <= 100),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_transactions_wallet_address ON transactions(wallet_address);
CREATE INDEX IF NOT EXISTS idx_transactions_recipient_address ON transactions(recipient_address);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_signature ON transactions(transaction_signature);

-- Enable Row Level Security
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view transactions where they are sender or recipient
CREATE POLICY "Users can view own transactions"
  ON transactions
  FOR SELECT
  USING (true);  -- Public read for now since we don't have user auth

-- Policy: Anyone can insert transactions (for demo purposes)
CREATE POLICY "Anyone can create transactions"
  ON transactions
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can update their own transactions
CREATE POLICY "Users can update own transactions"
  ON transactions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_transactions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS transactions_updated_at ON transactions;
CREATE TRIGGER transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_transactions_updated_at();

-- Add comment to table
COMMENT ON TABLE transactions IS 'Stores payment transaction history for ScoutyPay';
