# AdSense Configuration Guide

## Why Ads Might Not Be Showing

Ads are implemented in the code on all pages, but they will **not render** if the required environment variables are not set. The ad components check for these variables and return `null` if they're missing.

## Required Environment Variables

To enable ads on your site, you need to set these environment variables in your `.env.local` file (for local development) and in your Vercel/hosting platform settings:

### Required Variables

1. **`NEXT_PUBLIC_GOOGLE_ADSENSE_ID`** (Required)
   - Your Google AdSense Publisher ID
   - Format: `ca-pub-XXXXXXXXXXXXXXXX`
   - Example: `ca-pub-1234567890123456`

### Ad Slot Variables (At least one required)

2. **`NEXT_PUBLIC_GOOGLE_ADSENSE_DISPLAY_SLOT`** (Required for display ads)
   - Ad slot ID for display ads (used on most pages)
   - Format: `1234567890` (numeric)
   - Used by: `AdSenseDisplay` component

3. **`NEXT_PUBLIC_GOOGLE_ADSENSE_IN_ARTICLE_SLOT`** (Optional but recommended)
   - Ad slot ID for in-article ads (used in blog posts)
   - Format: `1234567890` (numeric)
   - Used by: `AdSenseInArticle` component

4. **`NEXT_PUBLIC_GOOGLE_ADSENSE_MATCHED_CONTENT_SLOT`** (Optional but recommended)
   - Ad slot ID for matched content (related content recommendations)
   - Format: `1234567890` (numeric)
   - Used by: `AdSenseMatchedContent` component

## How to Get Ad Slot IDs

1. Log in to your [Google AdSense account](https://www.google.com/adsense/)
2. Go to **Ads** → **By ad unit**
3. Create new ad units or use existing ones
4. Copy the **Ad unit ID** (the numeric value, not the full code)

## Current Ad Placements

### Blog Single Post Pages (`/blog/[slug]`)
- ✅ Ad after hero section (horizontal)
- ✅ Mid-content ad (within article content)
- ✅ In-article ad (fluid format)
- ✅ Ad before related posts (horizontal)
- ✅ Matched content ad (after article)
- ✅ Display ad (after article)

### Tools Listing Page (`/tools`)
- ✅ Ad after hero section (horizontal)
- ✅ Ad after category navigation (auto)
- ✅ Additional horizontal ad
- ✅ Ad after featured tools (conditional)
- ✅ Ad after tools grid (auto)

### Individual Tool Pages (`/tools/[tool-name]`)
- ✅ Ad after header (horizontal)
- ✅ Mid-content ad (after tool card)
- ✅ Ad after tool content (auto)

### Blog Listing Page (`/blog`)
- ✅ Ad after hero (horizontal)
- ✅ Ads between posts (every 2 posts)
- ✅ Ad after all posts (auto)

## Troubleshooting

### Ads Not Showing?

1. **Check Environment Variables**
   - Verify all required variables are set in your hosting platform
   - For Vercel: Go to Project Settings → Environment Variables
   - Make sure variables start with `NEXT_PUBLIC_` for client-side access

2. **Check Browser Console**
   - Open browser DevTools → Console
   - Look for warnings like: `"AdSenseDisplay: No ad slot provided..."`
   - These warnings indicate missing environment variables

3. **AdSense Account Status**
   - Ensure your AdSense account is approved
   - Check if your site is verified in AdSense
   - Verify ad units are active and approved

4. **Ad Blockers**
   - Disable ad blockers to test
   - Some browsers/extensions block ads by default

5. **Content Requirements**
   - AdSense may not show ads on pages with insufficient content
   - Ensure pages have enough text content (recommended: 500+ words)

6. **Site Approval**
   - New AdSense accounts may take time to show ads
   - Google needs to review and approve your site first

## Testing Ads Locally

1. Create `.env.local` file in project root:
```env
NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_GOOGLE_ADSENSE_DISPLAY_SLOT=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_IN_ARTICLE_SLOT=1234567890
NEXT_PUBLIC_GOOGLE_ADSENSE_MATCHED_CONTENT_SLOT=1234567890
```

2. Restart your development server:
```bash
npm run dev
# or
yarn dev
```

3. Check browser console for any warnings

## Ad Component Behavior

All ad components (`AdSenseDisplay`, `AdSenseInArticle`, `AdSenseMatchedContent`) will:
- Return `null` if `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` is not set
- Return `null` if the specific ad slot variable is not set
- Show a loading placeholder while initializing
- Show "Ad unavailable" if initialization fails
- Log warnings to console when variables are missing

## Best Practices

1. **Don't exceed 3 ads per page** (AdSense policy)
2. **Space ads appropriately** (minimum 200px between ads)
3. **Use appropriate ad formats**:
   - `horizontal` for banner-style ads
   - `auto` for responsive ads
   - `in-article` for content integration
4. **Test on mobile** - ensure ads don't break layout
5. **Monitor performance** - check AdSense dashboard regularly

## Current Ad Count Per Page

- **Blog Single Post**: 6 ad placements (but only 3-4 will typically show per AdSense policy)
- **Tools Listing**: 5 ad placements
- **Individual Tool**: 3 ad placements
- **Blog Listing**: 3+ ad placements (dynamic based on post count)

Note: Google AdSense will automatically limit the number of ads shown per page based on their policies, even if more placements exist in the code.

