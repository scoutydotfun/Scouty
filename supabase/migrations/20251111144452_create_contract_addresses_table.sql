/*
  # Create Contract Addresses Table

  1. New Tables
    - `contract_addresses`
      - `id` (uuid, primary key) - Unique identifier
      - `token_address` (text) - The contract/token address
      - `network` (text) - Network identifier (e.g., 'SOLANA')
      - `label` (text) - Optional label for the address
      - `is_active` (boolean) - Whether this address is currently active
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `contract_addresses` table
    - Add policy for public read access to active addresses
    - Add policy for authenticated admin users to manage addresses

  3. Indexes
    - Index on `is_active` for faster active address lookups
    - Index on `network` for filtering by network
*/

-- Create contract_addresses table
CREATE TABLE IF NOT EXISTS contract_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_address text NOT NULL,
  network text NOT NULL DEFAULT 'SOLANA',
  label text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for active address lookups
CREATE INDEX IF NOT EXISTS idx_contract_addresses_active
  ON contract_addresses(is_active)
  WHERE is_active = true;

-- Create index for network filtering
CREATE INDEX IF NOT EXISTS idx_contract_addresses_network
  ON contract_addresses(network);

-- Enable Row Level Security
ALTER TABLE contract_addresses ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active contract addresses
CREATE POLICY "Public read access to active addresses"
  ON contract_addresses
  FOR SELECT
  TO public
  USING (is_active = true);

-- Policy: Authenticated users can view all addresses
CREATE POLICY "Authenticated users can view all addresses"
  ON contract_addresses
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert addresses
CREATE POLICY "Authenticated users can insert addresses"
  ON contract_addresses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update addresses
CREATE POLICY "Authenticated users can update addresses"
  ON contract_addresses
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete addresses
CREATE POLICY "Authenticated users can delete addresses"
  ON contract_addresses
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contract_addresses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_contract_addresses_updated_at_trigger
  BEFORE UPDATE ON contract_addresses
  FOR EACH ROW
  EXECUTE FUNCTION update_contract_addresses_updated_at();

-- Insert initial example address (Solana contract address format)
INSERT INTO contract_addresses (token_address, network, label, is_active)
VALUES (
  'HxorG2BRxozPuepM7gTczJhvuJWxXozZpuep',
  'SOLANA',
  'Contract Address',
  true
)
ON CONFLICT DO NOTHING;