# Quick Start Guide - Scouty

Get Scouty running locally in under 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Git installed
- A Supabase account (free tier works)
- A Helius API key (free tier works)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/scoutydotfun/Scouty.git
cd Scouty
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_HELIUS_API_KEY=your-helius-key-here
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Open Browser
Navigate to `http://localhost:5173`

## First Steps

1. **Connect Wallet**: Click "Connect Wallet" in the header
2. **Scan a Wallet**: Go to "App" page and scan a Solana address
3. **Try ScoutyPay**: Navigate to ScoutyPay for protected payments
4. **Check Security**: Use the Security page to analyze tokens

## Troubleshooting

**Port already in use?**
```bash
# Kill the process on port 5173
npx kill-port 5173
npm run dev
```

**Database connection error?**
- Verify your Supabase credentials in `.env`
- Check that migrations have been applied

**Wallet won't connect?**
- Ensure you have a Solana wallet extension installed (Phantom, Solflare)
- Try refreshing the page

## Need Help?

- Check the [full documentation](README.md)
- Review [technical architecture](docs/TECHNICAL_ARCHITECTURE.md)
- Join our [Discord](https://discord.gg/scouty)

## Building for Production

```bash
npm run build
npm run preview
```

---

**Live Demo:** https://scouty.fun
**Documentation:** See README.md for complete details
