# TODO: Fix Next.js Hydration Mismatch in Navbar

## Plan Breakdown (Approved)
- [x] Step 1: Edit `src/app/components/Navbar.js` - Add `suppressHydrationWarning={true}` to mobile toggle button, add `typeof window === 'undefined'` guards to all useEffect for scroll/mobile/menu (prevents SSR errors).
- [ ] Step 2: Restart dev server (`npm run dev` in terminal).
- [ ] Step 3: Test hydration - Check browser console for no errors, verify mobile menu toggle/scroll/resize functionality.
- [ ] Step 4: Test incognito - Confirm clean hydration without extensions.
- [ ] Complete: Mark done and attempt_completion.

*Progress: Steps 1-2 complete (dev server restarted on port 3001). Steps 3-4: Manually verify in browser console at http://localhost:3001 - no hydration errors, test mobile menu/scroll/resize. If good, task complete.*

