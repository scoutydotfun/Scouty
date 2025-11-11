# Scouty - AI-Powered Solana Security Scanner

<div align="center">
  <img src="./public/MUFFIN (2).svg" alt="Scouty Logo" width="600"/>

  **Scan. Score. Secure.**

  [![Live Demo](https://img.shields.io/badge/Live-Demo-00C853?style=for-the-badge)](https://scouty.fun)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
  [![Solana](https://img.shields.io/badge/Solana-Blockchain-9945FF?style=for-the-badge&logo=solana)](https://solana.com)
</div>

## Overview

Scouty is an advanced AI-driven security analysis platform for the Solana blockchain. It provides comprehensive wallet and token analysis, scam detection, and secure payment solutions to protect users in the crypto ecosystem.

### Key Features

- **AI-Powered Security Analysis** - Advanced algorithms scan wallets and tokens for suspicious activity
- **Real-Time Risk Scoring** - Instant security ratings from 0-100 for tokens and wallets
- **Scam Detection** - Identifies honeypots, rugpulls, and malicious contracts
- **Protected Payments (ScoutyPay)** - Secure peer-to-peer payment solution with escrow
- **Activity Monitoring** - Real-time tracking of wallet transactions and behavior
- **Community Wall** - Share and view security alerts from the community

## Live Demo

Visit [scouty.fun](https://scouty.fun) to try Scouty in action!

## Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing

### Blockchain
- **Solana Web3.js** - Blockchain interaction
- **Wallet Adapter** - Multi-wallet support (Phantom, Solflare, etc.)
- **Helius API** - Enhanced blockchain data and webhooks

### Backend & Database
- **Supabase** - PostgreSQL database with real-time capabilities
- **Edge Functions** - Serverless API endpoints
- **Row Level Security** - Database security policies

### Security & APIs
- **AI Analysis Engine** - Custom security scoring algorithms
- **Token Metadata Analysis** - Smart contract inspection
- **Transaction Pattern Detection** - Anomaly detection

## Project Structure

```
scouty/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Partners.tsx
│   │   └── ...
│   ├── pages/           # Application pages
│   │   ├── Home.tsx
│   │   ├── App.tsx      # Wallet scanner
│   │   ├── ScoutyPay.tsx
│   │   ├── Security.tsx
│   │   └── ...
│   ├── contexts/        # React context providers
│   │   └── WalletContext.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useScrollAnimation.ts
│   │   └── useScrollEffects.ts
│   ├── lib/            # Utility libraries
│   │   ├── api.ts
│   │   ├── solana.ts
│   │   └── supabase.ts
│   └── index.css       # Global styles
├── supabase/
│   ├── migrations/     # Database migrations
│   └── functions/      # Edge functions
├── public/
│   ├── partners/       # Partner logos
│   └── *.svg          # Brand assets
└── docs/              # Additional documentation

```

## Installation

### Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account (for database)
- Helius API key (for Solana data)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/scoutydotfun/Scouty.git
   cd Scouty
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_HELIUS_API_KEY=your_helius_api_key
   ```

4. **Set up the database**

   Run the Supabase migrations:
   ```bash
   # Install Supabase CLI
   npm install -g supabase

   # Run migrations
   supabase db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:5173`

## Usage

### Scanning a Wallet

1. Navigate to the "App" page
2. Connect your Solana wallet or enter a wallet address
3. Click "Scan Wallet"
4. View the comprehensive security analysis including:
   - Overall risk score
   - Token holdings analysis
   - Transaction history
   - Suspicious activity alerts

### Using ScoutyPay

1. Go to the "ScoutyPay" page
2. Connect your wallet
3. Enter recipient address and amount
4. Review the security analysis
5. Complete the protected transaction

### Checking Token Security

1. Visit the "Security" page
2. Enter a token contract address
3. Get instant security metrics:
   - Liquidity analysis
   - Holder distribution
   - Contract verification
   - Risk indicators

## Features in Detail

### Security Scanner
- Analyzes wallet transaction patterns
- Identifies exposure to scam tokens
- Checks for suspicious contract interactions
- Provides actionable security recommendations

### ScoutyPay Protected Payments
- Escrow-based secure transfers
- Pre-transaction security checks
- Protection against known scam addresses
- Transaction history tracking

### Community Features
- Security alert sharing
- Token reputation system
- User-reported scams
- Community-driven threat intelligence

## Development

### Build for Production

```bash
npm run build
```

### Run Type Checking

```bash
npm run typecheck
```

### Lint Code

```bash
npm run lint
```

## Database Schema

The application uses Supabase with the following main tables:

- **scans** - Wallet and token scan results
- **transactions** - ScoutyPay transaction records
- **alerts** - Community security alerts
- **token_metadata** - Cached token information

All tables implement Row Level Security (RLS) for data protection.

## API Integration

### Helius API
- Real-time transaction data
- Enhanced token metadata
- Webhook support for live updates

### Supabase Edge Functions
- `/scan-wallet` - Performs wallet security analysis
- Serverless execution with Deno runtime

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security

Scouty takes security seriously. If you discover a security vulnerability, please email security@scouty.fun.

### Security Practices
- All API keys stored securely in environment variables
- Database access controlled by RLS policies
- Input validation on all user data
- Regular security audits

## Roadmap

- [ ] Mobile app (iOS/Android)
- [ ] Browser extension
- [ ] Advanced AI models for detection
- [ ] Multi-chain support (Ethereum, BSC)
- [ ] NFT security analysis
- [ ] Automated threat reports
- [ ] API for developers

## Team

Built with passion by the Scouty team for the blockchain security community.

## Partners

<div align="center">
  <img src="./public/partners/x402scan copy.png" alt="x402scan" height="60"/>
  <img src="./public/partners/Pump_fun_logo (2).png" alt="Pump.fun" height="60"/>
  <img src="./public/partners/solana_thumb.png" alt="Solana" height="60"/>
  <img src="./public/partners/CoinGecko_logo.png" alt="CoinGecko" height="60"/>
  <img src="./public/partners/107892413.png" alt="DexTools" height="60"/>
</div>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Solana Foundation for blockchain infrastructure
- Helius for enhanced API services
- Supabase for backend infrastructure
- The open-source community

## Contact

- Website: [scouty.fun](https://scouty.fun)
- Twitter: [@scoutydotfun](https://x.com/scoutydotfun)
- GitHub: [scoutydotfun](https://github.com/scoutydotfun)
- Discord: [Join our community](https://discord.gg/scouty)
- Email: hello@scouty.fun

---

<div align="center">
  Made with ❤️ for the Solana community

  **Scan. Score. Secure.**
</div>
