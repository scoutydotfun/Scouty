# Contract Address Management Feature

## Overview

A complete full-stack implementation for displaying and managing token contract addresses in the Scouty application. The feature includes database storage, API integration, and a polished UI component with copy-to-clipboard functionality.

---

## Features

### User-Facing Features
- ✅ Display active contract address from database
- ✅ Copy-to-clipboard with visual confirmation
- ✅ Truncated address display for better UX
- ✅ Direct link to Solscan blockchain explorer
- ✅ Loading state with spinner animation
- ✅ Graceful error handling
- ✅ Responsive design matching site theme

### Technical Features
- ✅ Database-driven (Supabase PostgreSQL)
- ✅ Row Level Security (RLS) policies
- ✅ TypeScript type safety
- ✅ Optimized queries with indexes
- ✅ Auto-updating timestamps
- ✅ CRUD operations support

---

## Implementation Details

### 1. Database Schema

**Table: `contract_addresses`**

```sql
CREATE TABLE contract_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_address text NOT NULL,
  network text NOT NULL DEFAULT 'SOLANA',
  label text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Indexes:**
- `idx_contract_addresses_active` - Fast lookup for active addresses
- `idx_contract_addresses_network` - Filter by blockchain network

**Security:**
- Public read access to active addresses only
- Authenticated users can perform full CRUD operations
- RLS policies enforce data protection

**Migration File:**
`supabase/migrations/20251111140000_create_contract_addresses_table.sql`

---

### 2. API Layer

**File:** `src/lib/api.ts`

**Function:** `getActiveContractAddress()`

```typescript
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
```

**Features:**
- Fetches the most recent active Solana contract address
- Returns `null` instead of throwing on errors
- Uses `maybeSingle()` for safe zero-or-one row queries
- Type-safe with TypeScript interface

---

### 3. Frontend Component

**File:** `src/components/ContractAddress.tsx`

**Key Features:**

1. **State Management**
   - Loading state with spinner
   - Error handling with graceful fallback
   - Copy confirmation feedback

2. **Address Display**
   - Truncates long addresses: `HxorG2BR...XozZpuep`
   - Shows network badge (SOLANA)
   - Optional label display

3. **Interactive Elements**
   - Copy button with clipboard API
   - External link to Solscan explorer
   - Hover effects and transitions

4. **Styling**
   - Glassmorphic dark theme
   - Consistent with existing site design
   - Responsive layout
   - Accessible button states

**Component Structure:**

```tsx
<ContractAddress>
  ├── Loading State (Spinner)
  ├── Error State (Silent fail)
  └── Success State
      ├── Network Badge
      ├── Truncated Address
      ├── Copy Button (with feedback)
      └── External Link Button
</ContractAddress>
```

---

### 4. Integration

**File:** `src/pages/Playground.tsx`

The component is positioned on the API Playground page, directly below the status badges as specified:

```tsx
{/* Status badges */}
<div className="flex flex-wrap gap-3 mb-10">
  {/* ... badges ... */}
</div>

{/* Contract Address Component */}
<div className="mb-10">
  <ContractAddress />
</div>

{/* Request/Response panels */}
<div className="grid lg:grid-cols-2 gap-8">
  {/* ... */}
</div>
```

---

## Usage

### For End Users

1. Navigate to the API Playground page
2. The contract address appears automatically below the status badges
3. Click the copy button to copy the address to clipboard
4. Click the external link to view the token on Solscan

### For Administrators

**Adding a New Contract Address:**

```sql
INSERT INTO contract_addresses (token_address, network, label, is_active)
VALUES (
  'YourContractAddressHere123456789',
  'SOLANA',
  'Main Contract',
  true
);
```

**Deactivating Old Addresses:**

```sql
UPDATE contract_addresses
SET is_active = false
WHERE token_address = 'OldAddressHere';
```

**Updating the Current Address:**

```sql
UPDATE contract_addresses
SET token_address = 'NewAddressHere',
    label = 'Updated Contract'
WHERE id = 'uuid-here';
```

---

## Database Management

### Via Supabase Dashboard

1. Go to Table Editor
2. Select `contract_addresses` table
3. Use the UI to add/edit/delete records
4. Set `is_active` to `true` for the address to display

### Via SQL Editor

Run migrations or direct SQL commands in the Supabase SQL Editor:

```sql
-- View all addresses
SELECT * FROM contract_addresses ORDER BY created_at DESC;

-- Get the current active address
SELECT * FROM contract_addresses
WHERE is_active = true AND network = 'SOLANA'
ORDER BY created_at DESC
LIMIT 1;

-- Update an address
UPDATE contract_addresses
SET token_address = 'NewAddress123',
    updated_at = now()
WHERE id = 'your-uuid-here';
```

---

## Configuration

### Environment Variables

Ensure these are set in your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Initial Setup

1. **Run the migration:**
   ```bash
   # Using Supabase CLI
   supabase db push
   ```

2. **Verify the table:**
   - Check Supabase Dashboard > Table Editor
   - Should see `contract_addresses` table
   - One example address should be pre-populated

3. **Test the component:**
   - Navigate to `/playground`
   - Contract address should display
   - Test copy and external link buttons

---

## Styling & Design

The component follows the existing Scouty design system:

**Colors:**
- Background: `bg-white/5` (semi-transparent white)
- Borders: `border-white/10`
- Text: `text-white`, `text-gray-400`
- Hover: `hover:bg-white/[0.07]`

**Typography:**
- Address: Monospace font (`font-mono`)
- Label: Small gray text (`text-xs text-gray-500`)
- Network: Uppercase badge (`uppercase tracking-wider`)

**Effects:**
- Smooth transitions: `transition-colors`, `transition-all`
- Hover lift on copy/link buttons
- Pulse animation for "Copied!" confirmation
- Loading spinner rotation

---

## Error Handling

The component handles errors gracefully:

1. **Network Errors:** Silent fail, component doesn't render
2. **No Active Address:** Component doesn't render
3. **Copy Failures:** Logs to console, no UI disruption
4. **Loading Delays:** Shows spinner until data loaded

---

## Performance Optimizations

1. **Database Indexes:**
   - Fast lookups on `is_active` column
   - Efficient filtering by `network`

2. **Query Optimization:**
   - Uses `limit(1)` to fetch only needed data
   - Filters in database rather than application

3. **Component Efficiency:**
   - `useEffect` with empty deps - fetches once on mount
   - Memoized event handlers
   - No unnecessary re-renders

---

## Security Considerations

1. **RLS Policies:**
   - Public can only read active addresses
   - Full CRUD requires authentication

2. **Input Validation:**
   - Database constraints ensure data integrity
   - TypeScript types prevent type errors

3. **External Links:**
   - Uses `rel="noopener noreferrer"` for security
   - Opens in new tab to preserve app state

---

## Testing

### Manual Testing Checklist

- [ ] Component loads without errors
- [ ] Loading spinner displays briefly
- [ ] Address displays correctly
- [ ] Address is truncated properly
- [ ] Copy button copies full address
- [ ] "Copied!" confirmation appears
- [ ] External link opens Solscan in new tab
- [ ] Component matches site theme
- [ ] Responsive on mobile
- [ ] Works when no address is active

### Database Testing

```sql
-- Test: Get active address
SELECT * FROM contract_addresses WHERE is_active = true;

-- Test: Update and check timestamp
UPDATE contract_addresses SET label = 'Test Update' WHERE is_active = true;
SELECT updated_at FROM contract_addresses WHERE is_active = true;

-- Test: RLS policies (as public user)
-- Should only see active addresses
```

---

## Troubleshooting

### Component Not Showing

1. Check Supabase connection in browser console
2. Verify `VITE_SUPABASE_*` env variables are set
3. Ensure migration has been run
4. Check that at least one address has `is_active = true`

### Copy Not Working

1. Check browser permissions for clipboard API
2. Ensure HTTPS is enabled (clipboard API requires secure context)
3. Check browser console for errors

### Database Errors

1. Verify RLS policies are enabled
2. Check that indexes were created
3. Ensure migration ran successfully
4. Review Supabase logs for SQL errors

---

## Future Enhancements

Potential improvements for future iterations:

1. **Multi-Network Support:**
   - Toggle between Solana, Ethereum, BSC
   - Filter by network in UI

2. **Admin Panel:**
   - CRUD interface for managing addresses
   - Bulk operations
   - History/audit log

3. **Address Validation:**
   - Real-time validation on input
   - Network-specific format checking

4. **Advanced Features:**
   - QR code generation
   - Share functionality
   - Address book/favorites

---

## Files Modified/Created

### Created Files
- `supabase/migrations/20251111140000_create_contract_addresses_table.sql`
- `src/components/ContractAddress.tsx`
- `CONTRACT_ADDRESS_FEATURE.md` (this file)

### Modified Files
- `src/lib/api.ts` - Added `getActiveContractAddress()` function
- `src/pages/Playground.tsx` - Integrated ContractAddress component

---

## Dependencies

No new dependencies were added. The feature uses existing packages:

- `@supabase/supabase-js` - Database queries
- `lucide-react` - Icons (Copy, CheckCircle, ExternalLink, Loader2)
- `react` - Component framework

---

## Support

For issues or questions:

1. Check this documentation
2. Review Supabase logs
3. Check browser console for errors
4. Verify environment variables
5. Test database connection

---

## License

This feature is part of the Scouty project and follows the same MIT License.

---

**Last Updated:** November 11, 2024
**Version:** 1.0.0
**Status:** ✅ Production Ready
