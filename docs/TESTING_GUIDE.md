# Testing Guide - App & Wall Pages

## Quick Testing Checklist

### App Page (`/app`)

#### Visual Check
- [ ] Page loads without layout issues
- [ ] Stats cards display correctly (3 cards in a row on desktop)
- [ ] Token benefits banner shows at top
- [ ] Scan form is visible and properly styled
- [ ] Recent scans section displays on right side

#### Functionality Tests

**1. Wallet Scanning**
```
Test Case: Valid wallet scan
1. Enter a valid Solana address (e.g., 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU)
2. Click "Scan Wallet"
3. Verify loading spinner appears
4. Verify scan result displays with:
   - Risk score (0-100)
   - Risk level badge
   - Transaction count
   - Wallet age
   - AI summary
```

```
Test Case: Invalid wallet
1. Enter invalid text (e.g., "not-a-wallet")
2. Click "Scan Wallet"
3. Verify error message: "Invalid Solana wallet address"
```

```
Test Case: Empty wallet
1. Leave input empty
2. Click "Scan Wallet"
3. Verify error message: "Please enter a wallet address"
```

**2. Real-Time Statistics**
```
Test Case: Stats load on page load
1. Refresh the page
2. Verify stats show numbers (not "0" unless database is empty)
3. Verify "Updated" timestamp shows current time
```

```
Test Case: Stats update after scan
1. Perform a wallet scan
2. Verify "Total Scans" increments by 1
3. Verify "Avg Score" recalculates
4. If score >= 75, verify "Badges Minted" increments
```

**3. Recent Scans**
```
Test Case: Recent scans display
1. Look at "Your Recent Scans" section
2. Verify it shows up to 5 recent public scans
3. Each scan should show:
   - Shortened wallet address
   - Risk level badge
   - Score/100
   - Date
```

```
Test Case: Refresh recent scans
1. Click "Refresh" button in Recent Scans
2. Verify scans reload
```

**4. Share to Public Wall**
```
Test Case: Share scan publicly
1. Check "Share an anonymized card to the public wall"
2. Scan a wallet
3. Navigate to /wall
4. Verify the scan appears in the wall
```

#### Responsive Tests

**Mobile (< 640px)**
```
1. Open DevTools, set to iPhone SE (375px)
2. Verify:
   - Stats cards stack vertically
   - Scan form is full width
   - Text is readable
   - Buttons are tappable (min 44px)
   - No horizontal scroll
```

**Tablet (768px)**
```
1. Set viewport to iPad (768px)
2. Verify:
   - Stats cards in row
   - Two-column layout appears
   - Proper spacing
```

**Desktop (1024px+)**
```
1. Set viewport to 1440px
2. Verify:
   - Full layout displays
   - Max width container centered
   - Proper spacing
```

---

### Wall Page (`/wall`)

#### Visual Check
- [ ] Page loads without layout issues
- [ ] Header displays correctly
- [ ] Community feed card is centered
- [ ] Scan cards display in list format
- [ ] Refresh button is visible

#### Functionality Tests

**1. Load Scans**
```
Test Case: Initial load
1. Navigate to /wall
2. Verify loading spinner appears
3. Verify scans load (if any exist)
4. Verify "Last updated" timestamp shows
```

```
Test Case: Empty state
1. If database has no public scans
2. Verify message: "No public scans yet. Be the first to share!"
```

**2. Refresh Functionality**
```
Test Case: Manual refresh
1. Click "Refresh" button
2. Verify:
   - Button shows "Refreshing..." text
   - RefreshCw icon spins
   - Button is disabled during refresh
   - Scans reload
   - "Last updated" timestamp updates
```

**3. Real-Time Updates**
```
Test Case: Real-time scan addition
1. Open /wall in one tab
2. In another tab, scan a wallet and share publicly
3. Verify the new scan appears in /wall instantly
4. Verify "Last synced: Just now" updates
```

**4. Error Handling**
```
Test Case: Network error
1. Disconnect network (or simulate in DevTools)
2. Refresh the page
3. Verify error state displays:
   - Red alert icon
   - Error message
   - "Try Again" button
4. Click "Try Again"
5. Verify scans attempt to reload
```

**5. Scan Display**
```
Test Case: Scan card information
Each scan card should display:
- Shortened wallet address (e.g., "7xKXtg...8AsU")
- Risk level badge (LOW/MEDIUM/HIGH)
- Risk score (large number, right side)
- Time ago (e.g., "5m ago", "2h ago")
- Correct color coding:
  - LOW: Green
  - MEDIUM: Yellow
  - HIGH: Red
```

#### Responsive Tests

**Mobile (< 640px)**
```
1. Set to iPhone SE (375px)
2. Verify:
   - Header stacks vertically
   - Refresh button below title
   - Scan cards full width
   - Scores visible
   - No layout breaks
```

**Tablet (768px)**
```
1. Set to iPad (768px)
2. Verify:
   - Header in row
   - Proper spacing
   - Cards readable
```

**Desktop (1024px+)**
```
1. Set to 1440px
2. Verify:
   - Max width container
   - Centered layout
   - Optimal spacing
```

---

## Browser Testing

### Chrome/Edge
```
1. Open in Chrome
2. Run all App page tests
3. Run all Wall page tests
4. Check Console for errors (should be none)
5. Check Network tab (all requests successful)
```

### Firefox
```
1. Open in Firefox
2. Run all App page tests
3. Run all Wall page tests
4. Verify styles render correctly
5. Check Console for errors
```

### Safari (macOS/iOS)
```
1. Open in Safari
2. Run all App page tests
3. Run all Wall page tests
4. Test on iOS device if available
5. Verify touch interactions
```

---

## Performance Testing

### Lighthouse Audit
```
1. Open DevTools
2. Go to Lighthouse tab
3. Run audit for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO
4. Target scores:
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 95+
   - SEO: 90+
```

### Network Testing
```
Test Case: Slow 3G
1. Open DevTools → Network tab
2. Set throttling to "Slow 3G"
3. Refresh page
4. Verify:
   - Loading states appear
   - Page remains usable
   - Timeouts don't occur
```

---

## Accessibility Testing

### Keyboard Navigation
```
1. Use only Tab, Shift+Tab, Enter, Space
2. Test:
   - [ ] Can navigate to all interactive elements
   - [ ] Focus indicators are visible
   - [ ] Can submit forms with Enter
   - [ ] Can click buttons with Space
   - [ ] No keyboard traps
```

### Screen Reader
```
1. Enable screen reader (NVDA/JAWS/VoiceOver)
2. Navigate pages
3. Verify:
   - [ ] Headings are announced
   - [ ] Buttons have labels
   - [ ] Form inputs have labels
   - [ ] Error messages are announced
   - [ ] Loading states are announced
```

### Color Contrast
```
1. Use browser extension (e.g., axe DevTools)
2. Check contrast ratios
3. Verify:
   - [ ] Text on backgrounds: 4.5:1 minimum
   - [ ] Large text: 3:1 minimum
   - [ ] UI elements: 3:1 minimum
```

---

## Edge Cases

### App Page

```
Test Case: Multiple rapid scans
1. Scan a wallet
2. Immediately scan another
3. Verify:
   - Previous scan cancels gracefully
   - No race conditions
   - Latest scan displays
```

```
Test Case: Very long wallet address
1. Paste a 100-character string
2. Verify input doesn't break layout
3. Error message should display
```

```
Test Case: Special characters in input
1. Enter: !@#$%^&*()
2. Verify validation catches it
3. Error message displays
```

### Wall Page

```
Test Case: Rapid refresh clicks
1. Click Refresh button 10 times rapidly
2. Verify:
   - Only one request sent
   - Button stays disabled
   - No errors occur
```

```
Test Case: 50+ scans loaded
1. Ensure database has 50+ public scans
2. Load page
3. Verify:
   - Only 50 scans display
   - Performance is good
   - Scrolling is smooth
```

```
Test Case: Real-time with 100+ updates
1. Simulate many rapid inserts
2. Verify:
   - Page doesn't crash
   - Updates throttle properly
   - List stays at 50 items
```

---

## Integration Testing

### Database Integration
```
Test Case: Supabase connection
1. Verify RLS policies allow:
   - [ ] Reading public scans
   - [ ] Inserting new scans
   - [ ] Updating scan public status
2. Verify real-time subscriptions work
3. Check error handling for network issues
```

### Edge Function Integration
```
Test Case: Scan wallet function
1. Call edge function via App page
2. Verify:
   - [ ] Request succeeds
   - [ ] Response contains all fields
   - [ ] Data saves to database
   - [ ] Stats update correctly
```

---

## Common Issues & Solutions

### Issue: Stats show 0
**Solution**: Database needs initial data
```sql
-- Run a test scan or insert test data
```

### Issue: Scans don't load on Wall
**Solution**: Check RLS policies
```sql
-- Verify is_public=true filter works
SELECT * FROM wallet_scans WHERE is_public = true;
```

### Issue: Scan button does nothing
**Solution**: Check browser console
- Network errors → Check Helius RPC
- CORS errors → Check Supabase setup
- Validation errors → Check wallet format

### Issue: Real-time not working
**Solution**: Check Supabase subscriptions
```typescript
// Verify subscription is active
console.log('Subscription state:', subscription);
```

---

## Automated Testing Commands

```bash
# Type check
npm run typecheck

# Lint
npm run lint

# Build
npm run build

# Run dev server
npm run dev
```

---

## Sign-Off Checklist

Before marking as complete, verify:

- [ ] All App page tests pass
- [ ] All Wall page tests pass
- [ ] Responsive on 3+ screen sizes
- [ ] Tested on 2+ browsers
- [ ] No console errors
- [ ] Build succeeds
- [ ] Lighthouse scores acceptable
- [ ] Accessibility tests pass
- [ ] Error states work
- [ ] Loading states work
- [ ] Real-time updates work
- [ ] Database integration works
- [ ] Edge function integration works

---

**Last Updated**: 2025-11-09
**Status**: Ready for Testing
**Priority**: High
