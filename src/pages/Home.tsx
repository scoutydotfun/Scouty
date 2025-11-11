import { ArrowRight, Github, Code2, Shield, Database, Search, TrendingUp, CheckCircle, Lock, Share2, Wallet, FileText, User, Building, Repeat, Users, ChevronDown, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Partners from '../components/Partners';
import ContractAddress from '../components/ContractAddress';
import { useRevealOnScroll } from '../hooks/useScrollEffects';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Home() {
  const navigate = useNavigate();
  const heroReveal = useRevealOnScroll();
  const featuresReveal = useRevealOnScroll();
  const statsReveal = useRevealOnScroll();

  // Initialize scroll animations
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            ref={heroReveal.ref}
            className={`text-center mb-12 reveal-on-scroll ${heroReveal.isRevealed ? 'revealed' : ''}`}
          >
            <div className="flex items-center justify-center space-x-2 mb-8">
              <span className="text-xs text-gray-400 flex items-center">
                <Database className="w-3 h-3 mr-1" />
                Built on <span className="text-white ml-1 font-semibold neon-glow">OpenLibAi02</span>
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12 stagger-children">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700 hover-lift transition-all-300">
                <Code2 className="w-3 h-3 mr-1.5 text-white" />
                Open Source
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700 hover-lift transition-all-300">
                <Github className="w-3 h-3 mr-1.5 text-emerald-400" />
                REST API
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700 hover-lift transition-all-300">
                <Database className="w-3 h-3 mr-1.5 text-blue-400" />
                NPM SDK
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700 hover-lift transition-all-300">
                <Shield className="w-3 h-3 mr-1.5 text-green-400" />
                100 Friendly
              </span>
            </div>

            <div className="flex justify-center mb-8">
              <img
                src="/MUFFIN (2).svg"
                alt="Scouty - Scan. Score. Secure."
                className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl h-auto px-4"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.15))' }}
              />
            </div>

            <p className="text-lg sm:text-xl text-gray-400 mb-4 max-w-4xl mx-auto leading-relaxed">
              Advanced AI-driven security analysis and protected payment solutions
            </p>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-4xl mx-auto leading-relaxed">
              built for Solana. <span className="text-white font-semibold">Enterprise-grade SDK and REST API</span> for effortless
            </p>
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-4xl mx-auto">
              integration within your decentralized application, organization, or service.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => navigate('/app')}
                className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-all flex items-center justify-center space-x-2 hover:scale-105"
              >
                <span>Launch App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/playground')}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-medium rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Try API Playground</span>
              </button>
              <button
                onClick={() => navigate('/scoutypay')}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>Try Payment SDK</span>
                <Code2 className="w-4 h-4" />
              </button>
            </div>

            {/* Contract Address Component */}
            <div className="max-w-2xl mx-auto mb-16">
              <ContractAddress />
            </div>

            <div className="flex justify-center space-x-4 mb-12">
              <button
                onClick={() => navigate('/app')}
                className="px-4 py-2 bg-gray-800/50 hover:bg-white/20 text-white rounded-lg transition-colors text-sm border border-white/30"
              >
                Security API
              </button>
              <button
                onClick={() => navigate('/scoutypay')}
                className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700 text-gray-400 rounded-lg transition-colors text-sm border border-gray-700"
              >
                Payment SDK
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto morph-enter">
            <div className="bg-[#0d1117] rounded-xl border border-gray-800 overflow-hidden">
              <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-xs text-gray-400">POST /api/scan</span>
                </div>
                <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded transition-colors">
                  Copy
                </button>
              </div>
              <div className="p-6">
                <pre className="text-sm text-left overflow-x-auto">
                  <code>
                    <span className="text-white">curl</span> <span className="text-yellow-300">-X POST</span> <span className="text-green-400">https://scouty.fun/api/scan</span> <span className="text-gray-500">\</span>
                    {'\n  '}<span className="text-yellow-300">-H</span> <span className="text-orange-400">"Content-Type: application/json"</span> <span className="text-gray-500">\</span>
                    {'\n  '}<span className="text-yellow-300">-d</span> <span className="text-orange-400">{'\'{'}</span>
                    {'\n    '}<span className="text-blue-400">"wallet"</span><span className="text-gray-500">:</span> <span className="text-orange-400">"[SOLANA_WALLET_ADDRESS]"</span>
                    {'\n  '}<span className="text-orange-400">{'}\''}</span>
                  </code>
                </pre>
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="text-xs text-gray-500 mb-2"># Response: 200 OK</div>
                  <pre className="text-sm">
                    <code>
                      <span className="text-gray-500">{'{'}</span>
                      {'\n  '}<span className="text-blue-400">"score"</span><span className="text-gray-500">:</span> <span className="text-green-400">85</span><span className="text-gray-500">,</span>
                      {'\n  '}<span className="text-blue-400">"status"</span><span className="text-gray-500">:</span> <span className="text-orange-400">"LOW"</span><span className="text-gray-500">,</span>
                      {'\n  '}<span className="text-blue-400">"findings"</span><span className="text-gray-500">:</span> <span className="text-gray-500">[</span><span className="text-orange-400">"No high-risk patterns detected"</span><span className="text-gray-500">],</span>
                      {'\n  '}<span className="text-blue-400">"summary"</span><span className="text-gray-500">:</span> <span className="text-orange-400">"Wallet shows healthy activity..."</span><span className="text-gray-500">,</span>
                      {'\n  '}<span className="text-blue-400">"metadata"</span><span className="text-gray-500">:</span> <span className="text-gray-500">{'{'}</span>
                      {'\n    '}<span className="text-blue-400">"totalValue"</span><span className="text-gray-500">:</span> <span className="text-green-400">47.93</span><span className="text-gray-500">,</span>
                      {'\n    '}<span className="text-blue-400">"transCount"</span><span className="text-gray-500">:</span> <span className="text-green-400">89</span><span className="text-gray-500">,</span>
                      {'\n    '}<span className="text-blue-400">"accountAge"</span><span className="text-gray-500">:</span> <span className="text-green-400">120</span>
                      {'\n  '}<span className="text-gray-500">{'}'}</span>
                      {'\n'}<span className="text-gray-500">{'}'}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-6 mt-8">
              <button
                onClick={() => navigate('/docs')}
                className="text-sm text-white hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>API Documentation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/playground')}
                className="text-sm text-white hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>Try in Playground</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Scouty Works</h2>
            <p className="text-gray-400">Three straightforward steps to protect your Solana wallet</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative morph-slide-left">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
                1
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 pt-12">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                  <Search className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Scan</h3>
                <p className="text-gray-400 text-sm">
                  Enter any Solana wallet address. Analysis requires no wallet connection or signature.
                </p>
              </div>
            </div>

            <div className="relative morph-fade-up">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
                2
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 pt-12">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Score & Insights</h3>
                <p className="text-gray-400 text-sm">
                  Receive a consistent risk rating (0-100) with 3 AI-generated actionable recommendations—compact enough to capture and share.
                </p>
              </div>
            </div>

            <div className="relative morph-slide-right">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
                3
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 pt-12">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mint Badge</h3>
                <p className="text-gray-400 text-sm">
                  Score ≥75? Create a unique, verifiable SFT Safety Badge stored permanently on-chain. Distribute your assessment link for verification purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Safety Badges Work</h2>
            <p className="text-gray-400">
              Transform your security assessment into immutable blockchain verification that creates new possibilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
                1
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 pt-12">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Scored</h3>
                <p className="text-gray-400 text-sm">
                  AI evaluates your wallet using 20+ security criteria. Scores range from 0 to 100.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
                2
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 pt-12">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mint Badge</h3>
                <p className="text-gray-400 text-sm">
                  Achieved 75+? Create your Safety Badge. It's an SFT token that resides permanently in your wallet.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
                3
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 pt-12">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Verified</h3>
                <p className="text-gray-400 text-sm">
                  Projects verify your wallet. Badge present = immediate authorization. No paperwork, no delays.
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold mb-6">What Is A Safety Badge?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">SFT Token (NFT)</h4>
                    <p className="text-sm text-gray-400">Resides in your wallet just like any standard Solana token</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Permanent & Verifiable</h4>
                    <p className="text-sm text-gray-400">Cannot be counterfeited, deleted, or moved to another wallet</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Instantly Checkable</h4>
                    <p className="text-sm text-gray-400">Projects authenticate with a single API request</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden">
              <div className="bg-[#161b22] px-4 py-3 border-b border-gray-800">
                <span className="text-xs text-gray-400">// Project integration</span>
              </div>
              <div className="p-6">
                <pre className="text-sm overflow-x-auto">
                  <code>
                    <span className="text-purple-400">if</span> <span className="text-gray-400">(</span><span className="text-white">wallet.hasBadge</span><span className="text-gray-400">())</span> <span className="text-gray-400">{'{'}</span>
                    {'\n  '}<span className="text-green-400">✓ approve</span><span className="text-gray-400">()</span>
                    {'\n  '}<span className="text-gray-500">// Whitelist</span>
                    {'\n  '}<span className="text-gray-500">// Priority</span>
                    {'\n  '}<span className="text-gray-500">// DAO access</span>
                    {'\n'}<span className="text-gray-400">{'}'}</span> <span className="text-purple-400">else</span> <span className="text-gray-400">{'{'}</span>
                    {'\n  '}<span className="text-red-400">✗ deny</span><span className="text-gray-400">()</span>
                    {'\n'}<span className="text-gray-400">{'}'}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Verifiable & Transparent</h2>
            <p className="text-gray-400">Founded on transparency, driven by blockchain technology</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">On-chain badges</h3>
                <p className="text-sm text-gray-400">
                  Each Safety Badge exists as an authentic SFT token. Inspect via Solana Explorer.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Deterministic scoring</h3>
                <p className="text-sm text-gray-400">
                  Identical wallet, identical score—consistently. Fully transparent methodology.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Owned & immutable</h3>
                <p className="text-sm text-gray-400">
                  Experiment securely on devnet and mainnet—create badges on mainnet.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Open links</h3>
                <p className="text-sm text-gray-400">
                  Every assessment connects to Solana Explorer for wallet & badge authentication.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Features</h2>
            <p className="text-gray-400">Professional-level security assessment accessible to all</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Deterministic Heuristics</h3>
                <p className="text-sm text-gray-400">
                  Examine transaction behavior, token variety, wallet maturity and engagement, liquidation events, and exploit risk indicators.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">AI Insights</h3>
                <p className="text-sm text-gray-400">
                  Concise, actionable recommendations—3 key points per analysis. Zero filler.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Shareable Reports</h3>
                <p className="text-sm text-gray-400">
                  Each analysis generates a distinct URL. Distribute to your colleagues, reviewers, or network.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Safety Badge Minting</h3>
                <p className="text-sm text-gray-400">
                  Meet the requirement? Create a unique SFT token as evidence. Authenticated on-chain.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Wallet-Native UX</h3>
                <p className="text-sm text-gray-400">
                  Link via Phantom or Solflare. No separate authentication required.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Built for Audits</h3>
                <p className="text-sm text-gray-400">
                  Universal timestamps, export capabilities, consistent formatting. SSL-secure. Hydration-compatible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Who Uses Scouty?</h2>
            <p className="text-gray-400">Relied upon by users, groups, and enterprises</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Personal Wallets</h3>
                <p className="text-sm text-gray-400">
                  Evaluate your security status before receiving airdrops or engaging with unfamiliar dApps.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">dApps Treasuries</h3>
                <p className="text-sm text-gray-400">
                  Confirm multisig security, distribute assessments to DAO participants or stakeholders.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Repeat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">OTC Deals</h3>
                <p className="text-sm text-gray-400">
                  Examine counterparty wallets prior to significant Solana transactions.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Community Gating</h3>
                <p className="text-sm text-gray-400">
                  Mandate badge ownership for Discord permissions, allowlist entry, or voting influence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">All the essential information</p>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="How does the risk scoring system work?"
              answer="Our AI evaluates 20+ security elements including transaction behavior, token variety, wallet maturity, engagement patterns, and recognized threat indicators. The scoring is deterministic—identical wallet produces identical results consistently."
            />
            <FAQItem
              question="What information gets stored?"
              answer="We exclusively examine publicly available blockchain information. Analysis results are briefly cached for efficiency. Zero personal data is gathered or retained."
            />
            <FAQItem
              question="Which RPC do you use?"
              answer="We utilize several high-speed Solana RPC nodes for dependability and performance."
            />
            <FAQItem
              question="What's the minimum score for a Safety Badge?"
              answer="A minimum score of 75 is required to create a Safety Badge. This guarantees that only wallets demonstrating robust security characteristics earn badges."
            />
            <FAQItem
              question="Can badges be revoked?"
              answer="No. Once created, badges exist as permanent blockchain tokens that cannot be deleted or moved. This preserves their authenticity."
            />
            <FAQItem
              question="Is there a rate limit?"
              answer="The complimentary tier permits 100 requests per minute. Token owners receive unrestricted access with elevated support."
            />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <Partners />

      <Footer />
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
      >
        <span className="font-semibold text-left">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-sm text-gray-400">
          {answer}
        </div>
      )}
    </div>
  );
}
