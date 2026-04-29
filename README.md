# 📹 Live Stream Simulator

An Instagram Live-style camera app with simulated fan interactions — hearts, comments, and rising viewer counts.

## Deploy to Vercel (2 minutes)

### Option A: Vercel CLI (fastest)

```bash
# 1. Install Vercel CLI if you haven't
npm i -g vercel

# 2. Unzip this project, cd into it, and deploy
cd live-stream-app
npm install
vercel
```

Follow the prompts — Vercel auto-detects Vite. Your app will be live at a `.vercel.app` URL within seconds.

### Option B: GitHub → Vercel (auto-deploys on every push)

1. Create a new GitHub repo and push this folder to it:
   ```bash
   cd live-stream-app
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USER/live-stream-app.git
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Vercel auto-detects Vite — just click **Deploy**
5. Done! You'll get a URL like `live-stream-app.vercel.app`

## Open on Your Phone

1. Open the Vercel URL in **Safari** on your iPhone
2. Tap the **Share** button (□↑)
3. Tap **"Add to Home Screen"**
4. It launches fullscreen like a native app — no browser chrome!

## Camera Access

The app needs camera permission. When prompted:
- **Safari**: Tap "Allow" 
- **Chrome**: Tap "Allow"

HTTPS is required for camera access — Vercel provides this automatically.

## Features

- 📷 Front/back camera toggle
- 👁 Animated viewer count (ramps up organically)  
- 💬 Auto-scrolling fan comments from 45+ usernames
- 🤍 Floating hearts (auto + tap to send bursts)
- 🎨 Authentic Instagram Live UI layout
- 📱 PWA — installable on home screen, works offline
