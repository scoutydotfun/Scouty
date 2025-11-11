# Contract Address Feature - Quick Setup Guide

## 1. Run the Database Migration

### Option A: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Push the migration to your database
supabase db push
```

### Option B: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/migrations/20251111140000_create_contract_addresses_table.sql`
4. Paste into the SQL Editor
5. Click **Run**

---

## 2. Verify the Setup

### Check the Table

In Supabase Dashboard:
1. Go to **Table Editor**
2. You should see a new table called `contract_addresses`
3. It should have 1 pre-populated example address

### Test the Query

Run this in SQL Editor:

```sql
SELECT * FROM contract_addresses WHERE is_active = true;
```

You should see the example address:
- token_address: `HxorG2BRxozPuepM7gTczJhvuJWxXozZpuep`
- network: `SOLANA`
- is_active: `true`

---

## 3. Update the Contract Address (Optional)

To use your own contract address:

```sql
-- Deactivate the example address
UPDATE contract_addresses
SET is_active = false
WHERE token_address = 'HxorG2BRxozPuepM7gTczJhvuJWxXozZpuep';

-- Add your contract address
INSERT INTO contract_addresses (token_address, network, label, is_active)
VALUES (
  'YOUR_ACTUAL_SOLANA_ADDRESS_HERE',
  'SOLANA',
  'Contract Address',
  true
);
```

Or simply update the existing one:

```sql
UPDATE contract_addresses
SET token_address = 'YOUR_ACTUAL_SOLANA_ADDRESS_HERE'
WHERE is_active = true;
```

---

## 4. Test in the Application

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the **API Playground** page: `http://localhost:5173/playground`

3. You should see the contract address component below the status badges

4. Test the features:
   - ✅ Address displays
   - ✅ Copy button works
   - ✅ External link opens Solscan

---

## 5. Managing Addresses

### Add a New Address

```sql
INSERT INTO contract_addresses (token_address, network, label, is_active)
VALUES (
  'NewContractAddress123',
  'SOLANA',
  'New Contract',
  true
);
```

### Switch Active Address

```sql
-- Deactivate all
UPDATE contract_addresses SET is_active = false;

-- Activate specific one
UPDATE contract_addresses
SET is_active = true
WHERE id = 'your-uuid-here';
```

### Delete an Address

```sql
DELETE FROM contract_addresses
WHERE id = 'your-uuid-here';
```

---

## Troubleshooting

### "Table doesn't exist"
- Run the migration again
- Check Supabase logs for errors

### "Component not showing"
- Verify at least one address has `is_active = true`
- Check browser console for errors
- Verify environment variables are set

### "Copy not working"
- Ensure you're on HTTPS (or localhost)
- Check browser clipboard permissions

---

## That's It!

The feature is now fully functional and ready for production use. 🎉

For more details, see [CONTRACT_ADDRESS_FEATURE.md](./CONTRACT_ADDRESS_FEATURE.md)
