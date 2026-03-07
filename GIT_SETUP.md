# Git Setup & Deployment Instructions

## Step 1: Install Xcode Command Line Tools

Since Git requires Xcode Command Line Tools, run this command:

```bash
xcode-select --install
```

A dialog will appear. Click "Install" and wait for it to complete (5-10 minutes).

## Step 2: Commit Your Security Fixes

Once Xcode tools are installed, run these commands:

```bash
cd /Users/apple/Downloads/ku-ajira-digital-hub-main

# Check what files have changed
git status

# Add all security fixes
git add -A

# Commit with a descriptive message
git commit -m "Security: Implement critical security fixes

- Add RLS policies requiring authentication
- Implement server-side admin verification
- Add form input validation with Zod
- Add rate limiting to prevent brute force
- Add security headers (CSP, X-Frame-Options, etc)
- Secure .env file handling with .gitignore
- Update deployment documentation"

# View the commit
git log -1
```

## Step 3: Push to Remote Repository

If you have a remote repository (GitHub, GitLab, etc.):

```bash
# Push to main branch
git push origin main

# Or if your default branch is different
git push origin HEAD
```

## Step 4: Verify Changes

After pushing, verify on your Git platform:
1. Check that the commit appears in your repository history
2. Verify the files are there:
   - `src/lib/admin-auth.ts`
   - `src/lib/validation-schemas.ts`
   - `src/lib/security-headers.ts`
   - `supabase/migrations/20260208_fix_security_policies.sql`
   - Updated `.gitignore` and `vite.config.ts`

## Step 5: Configure Hosting Platform

Before deployment, set environment variables:

### For Vercel:
```bash
vercel env add VITE_SUPABASE_PROJECT_ID
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
```

### For Netlify:
1. Go to Site Settings → Build & Deploy → Environment
2. Add the 3 environment variables manually

### For Other Platforms (Railway, Heroku, etc.):
Add the variables in their dashboard

## Step 6: Deploy Supabase Migration

Run the SQL migration in your Supabase dashboard:

1. Go to Supabase Dashboard → Your Project
2. Click "SQL Editor"
3. Click "New Query"
4. Copy & paste contents of: `supabase/migrations/20260208_fix_security_policies.sql`
5. Click "Run"

## Step 7: Deploy Your Application

Once environment variables are set:

```bash
# For Vercel
vercel deploy --prod

# For Netlify
netlify deploy --prod

# For manual deployment, build and serve:
npm run build
npm run preview
```

## Troubleshooting

### "git: command not found"
Run: `xcode-select --install`

### "failed to push some refs"
Check that:
1. You're on the correct branch: `git branch`
2. Your remote is set: `git remote -v`
3. You have push permissions to the repository

### Supabase migration fails
Check the error message in Supabase:
1. Verify the SQL syntax
2. Ensure `app_role` type exists
3. Check that RLS is enabled on tables

## Important Reminders

✅ Do NOT commit `.env` files
✅ Always use `.env.local` locally (in .gitignore)
✅ Set variables in hosting platform, not in code
✅ Rotate Supabase keys before first deployment
✅ Test locally before deploying to production

---

Need help? Check:
- `DEPLOYMENT_GUIDE.md` - Detailed deployment steps
- `SECURITY_FIXES_IMPLEMENTATION.md` - Technical implementation details
- `SECURITY_ANALYSIS.md` - Security analysis and risks
