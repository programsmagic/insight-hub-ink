# Production Deployment Guide

This document outlines the production-ready improvements made to the codebase and deployment considerations.

## ✅ Production-Ready Improvements

### 1. Code Quality & Linting
- ✅ ESLint configuration with Next.js rules
- ✅ Prettier configuration for consistent code formatting
- ✅ TypeScript strict mode enabled
- ✅ Build-time linting enabled (no longer ignored)

### 2. Security
- ✅ Security headers configuration files (see below for hosting setup)
- ✅ Input validation and sanitization using Zod
- ✅ Rate limiting on API routes
- ✅ XSS protection headers (configure at CDN/hosting level)
- ✅ Content-Type-Options: nosniff (configure at CDN/hosting level)

### 3. Error Handling
- ✅ Error boundary component for React error catching
- ✅ Custom 404 page
- ✅ Custom error page (500)
- ✅ Proper error logging utility (replaces console.logs)
- ✅ Graceful error handling in API routes

### 4. API Routes
- ✅ Rate limiting (5 requests/min for consultation, 10/min for contact)
- ✅ Input validation with Zod schemas
- ✅ Input sanitization
- ✅ Proper error responses with status codes
- ✅ Rate limit headers in responses

### 5. Accessibility
- ✅ ARIA labels and roles
- ✅ Semantic HTML elements
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Proper form error announcements

### 6. Environment Variables
- ✅ Environment variable validation utility
- ✅ .env.example file for reference
- ✅ Removed hardcoded placeholder values

### 7. Performance
- ✅ React Strict Mode enabled
- ✅ Compression enabled
- ✅ Optimized images (unoptimized for static export)
- ✅ Lazy loading for images

## 📋 Pre-Deployment Checklist

### Environment Variables
1. Copy `.env.example` to `.env.local` or `.env.production`
2. Set all required environment variables:
   - `NEXT_PUBLIC_SITE_URL` - Your production URL
   - `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` - Your AdSense ID
   - `GOOGLE_VERIFICATION_CODE` - Google Search Console verification
   - Optional: Email service API keys, database URLs, etc.

### Build & Test
```bash
# Install dependencies
npm install

# Run type checking
npm run type-check

# Run linting
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Test production build locally
npm start
```

### Security Review
- [ ] Configure security headers at CDN/hosting level (see below)
- [ ] Verify rate limiting thresholds are appropriate
- [ ] Check that all API routes have proper validation
- [ ] Ensure no sensitive data in client-side code
- [ ] Verify environment variables are not exposed

### Performance Review
- [ ] Run Lighthouse audit (target: 90+)
- [ ] Check bundle size
- [ ] Verify image optimization
- [ ] Test on slow networks
- [ ] Check Core Web Vitals

### Accessibility Review
- [ ] Run accessibility audit (axe, WAVE, or Lighthouse)
- [ ] Test with keyboard navigation
- [ ] Test with screen reader
- [ ] Verify color contrast ratios
- [ ] Check ARIA labels

## 🚀 Deployment Steps

### Vercel (Recommended)
1. Push code to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Configure environment variables in Vercel dashboard
4. Configure security headers in `vercel.json` (see below)
5. Deploy

### Static Export (Current Setup)
```bash
npm run build
# Output will be in the `out` directory
# Deploy the `out` directory to your static hosting
```

### Other Platforms
- **Netlify**: Uses `public/_headers` file automatically
- **AWS Amplify**: Configure build settings and headers in console
- **GitHub Pages**: Use static export (headers via `.htaccess` or CDN)
- **Cloudflare Pages**: Configure headers in dashboard
- **Custom Server**: Use `npm start` after build

## 🔒 Security Headers Configuration

Since this project uses static export (`output: 'export'`), security headers cannot be set in `next.config.js`. They must be configured at the CDN/hosting level.

### Recommended Security Headers
```
X-DNS-Prefetch-Control: on
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Platform-Specific Configuration

#### Vercel
Create `vercel.json` in the root directory:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-DNS-Prefetch-Control",
          "value": "on"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

#### Netlify
The `public/_headers` file is already created and will be used automatically.

#### Cloudflare Pages
1. Go to Pages dashboard
2. Navigate to Settings > Functions
3. Add headers in the Functions tab or use Cloudflare Workers

#### AWS CloudFront
1. Go to CloudFront distribution
2. Navigate to Behaviors
3. Edit behavior and add custom headers in Response Headers Policy

#### GitHub Pages (via .htaccess)
If using Apache, create `.htaccess` in the `out` directory:
```apache
<IfModule mod_headers.c>
  Header set X-DNS-Prefetch-Control "on"
  Header set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "origin-when-cross-origin"
  Header set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>
```

## 🔧 Post-Deployment

### Monitoring
1. Set up error tracking (Sentry, LogRocket, etc.)
2. Configure analytics (Vercel Analytics already included)
3. Set up uptime monitoring
4. Monitor API rate limits

### Maintenance
1. Regularly update dependencies
2. Monitor security advisories
3. Review and update rate limits as needed
4. Keep environment variables secure

## 📝 Notes

- The codebase uses static export (`output: 'export'`), so API routes won't work in production unless you use a serverless function platform
- For API routes to work, consider:
  - Using Vercel (automatic serverless functions)
  - Using Netlify Functions
  - Setting up a separate API server
  - Using a backend-as-a-service (Supabase, Firebase, etc.)

## 🐛 Troubleshooting

### Build Errors
- Check TypeScript errors: `npm run type-check`
- Check linting errors: `npm run lint`
- Verify all environment variables are set

### Runtime Errors
- Check error logs in your hosting platform
- Verify environment variables are accessible
- Check rate limiting isn't too restrictive

### Performance Issues
- Run Lighthouse audit
- Check bundle size
- Optimize images
- Consider code splitting

## 📚 Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security-headers)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

