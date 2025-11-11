import { Zap, Shield, Code2, HelpCircle } from 'lucide-react';
import Footer from '../components/Footer';

export default function Docs() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Documentation</h1>
          <p className="text-gray-400">Everything you need to know about using Scouty</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <a
            href="#getting-started"
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Getting Started</h3>
            <p className="text-sm text-gray-400">Quick start guide</p>
          </a>

          <a
            href="#safety-badge"
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold mb-2">How Safety Badge Works</h3>
            <p className="text-sm text-gray-400">Badge process</p>
          </a>

          <a
            href="#api"
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
              <Code2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">API Reference</h3>
            <p className="text-sm text-gray-400">Integration guide</p>
          </a>

          <a
            href="#faq"
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
              <HelpCircle className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="font-semibold mb-2">FAQ</h3>
            <p className="text-sm text-gray-400">Common questions</p>
          </a>
        </div>

        <section id="getting-started" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Getting Started</h2>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-6 hover:bg-white/8 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4">What is Scouty?</h3>
            <p className="text-gray-400 leading-relaxed">
              Scouty is an AI-driven security analyzer for Solana wallets. It examines wallet behavior, transaction histories, and token portfolios to produce a consistent risk assessment (0-100) with practical AI-powered security recommendations.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4">How to Scan a Wallet</h3>
            <ol className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-white/20 rounded-full text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">1</span>
                <span>Navigate to the App</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-white/20 rounded-full text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">2</span>
                <span>Enter any Solana wallet address (base58 format, 32-44 characters)</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-white/20 rounded-full text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">3</span>
                <span>Click "Scan Wallet" - no wallet connection required</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-white/20 rounded-full text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">4</span>
                <span>Review the risk score, findings, and AI insights</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-white/20 rounded-full text-white text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">5</span>
                <span>Share the report link or mint a Safety Badge if eligible (score ≥75)</span>
              </li>
            </ol>
          </div>
        </section>

        <section id="risk-scores" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Understanding Risk Scores</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-emerald-400 mb-2">75-100</div>
              <h3 className="font-semibold text-emerald-400 mb-2">Low Risk</h3>
              <p className="text-sm text-gray-400">
                Eligible for Safety Badge minting
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-yellow-400 mb-2">50-74</div>
              <h3 className="font-semibold text-yellow-400 mb-2">Medium Risk</h3>
              <p className="text-sm text-gray-400">
                Review AI insights for improvements
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl p-6">
              <div className="text-3xl font-bold text-red-400 mb-2">0-49</div>
              <h3 className="font-semibold text-red-400 mb-2">High Risk</h3>
              <p className="text-sm text-gray-400">
                Significant security concerns
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
