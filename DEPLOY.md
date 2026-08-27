# Deployment Guide — Secret Birthday Surprise 🎂

This project is fully optimized and configured for **1-click instant deployment** to any modern web hosting service (Vercel, Netlify, GitHub Pages, Render, or Cloudflare Pages).

---

## Option 1: Deploy on Vercel (Recommended — Free & Instant)

### Via Vercel Web Dashboard (Easiest)
1. Push this project folder to your **GitHub / GitLab** account as `special-birthday-surprise` (or any surprise name of your choice).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** ➔ **"Project"**.
4. Import your repository.
5. Vercel will automatically detect Vite:
   * **Framework Preset**: `Vite`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
6. Click **Deploy**! In ~30 seconds, you will receive a live URL (e.g. `https://special-birthday-surprise.vercel.app` or custom domain).

### Via Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## Option 2: Deploy on Netlify (Free & Instant)

### Via Netlify Web Dashboard
1. Go to [netlify.com](https://netlify.com) and log in.
2. Click **"Add new site"** ➔ **"Import an existing project"**.
3. Select your repository.
4. Netlify will use the included [`netlify.toml`](./netlify.toml) configuration automatically.
5. Click **Deploy Site**!

### Drag & Drop (Zero Git Required)
1. Run `npm run build` on your computer.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist` folder into the browser window.
4. In Netlify Site Settings, you can rename the site to something like `secret-birthday-celebration.netlify.app`.
5. Your site is instantly live with a shareable URL!

---

## Option 3: Deploy on GitHub Pages

1. In `vite.config.js`, set `base: '/special-birthday-surprise/'` (matching your GitHub repo name).
2. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
3. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. Run:
   ```bash
   npm run deploy
   ```

---

## Pre-Configured Assets & Meta Tags
* **Custom Favicon**: Birthday cake SVG (`/favicon.svg`)
* **Social Sharing Preview (OpenGraph)**: Clean preview metadata ready for WhatsApp, iMessage, and Instagram link sharing.
* **SPA Routing & Fallbacks**: Configured in `vercel.json` and `netlify.toml`.
