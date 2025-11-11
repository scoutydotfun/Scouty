import { Search, TrendingUp, Shield, Zap, Gift, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { scanWallet, getPublicScans } from '../lib/api';
import type { ScanResult } from '../lib/api';
import { shortenAddress, isValidSolanaAddress } from '../lib/solana';
import { supabase } from '../lib/supabase';

export default function AppPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sharePublic, setSharePublic] = useState(false);
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalScans: 0,
    badgesMinted: 0,
    avgScore: 0
  });

  useEffect(() => {
    loadStats();
    loadRecentScans();
  }, []);

  const loadStats = async () => {
    try {
      const { count: totalScans } = await supabase
        .from('wallet_scans')
        .select('*', { count: 'exact', head: true });

      const { count: badgesMinted } = await supabase
        .from('wallet_scans')
        .select('*', { count: 'exact', head: true })
        .gte('risk_score', 75);

      const { data: scans } = await supabase
        .from('wallet_scans')
        .select('risk_score');

      const avgScore = scans && scans.length > 0
        ? Math.round(scans.reduce((sum, s) => sum + s.risk_score, 0) / scans.length * 10) / 10
        : 0;

      setStats({
        totalScans: totalScans || 0,
        badgesMinted: badgesMinted || 0,
        avgScore
      });
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const loadRecentScans = async () => {
    try {
      const scans = await getPublicScans(5);
      setRecentScans(scans || []);
    } catch (err) {
      console.error('Failed to load recent scans:', err);
    }
  };

  const handleScan = async () => {
    setError(null);
    setScanResult(null);

    if (!walletAddress.trim()) {
      setError('Please enter a wallet address');
      return;
    }

    if (!isValidSolanaAddress(walletAddress)) {
      setError('Invalid Solana wallet address');
      return;
    }

    setIsScanning(true);

    try {
      const result = await scanWallet(walletAddress, sharePublic);
      setScanResult(result);

      loadStats();
      loadRecentScans();
    } catch (err: any) {
      setError(err.message || 'Failed to scan wallet. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-emerald-400';
      case 'HIGH': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'LOW': return 'bg-emerald-500/20 border-emerald-500/30';
      case 'HIGH': return 'bg-red-500/20 border-red-500/30';
      default: return 'bg-yellow-500/20 border-yellow-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">Wallet Security Scanner</h1>
          <p className="text-gray-400">
            Analyze any Solana wallet for security risks and mint a Safety Badge for passing scores.
          </p>
        </div>

        <div className="mb-6 p-3 bg-white/10 border border-white/30 rounded-lg flex items-start space-x-3">
          <Shield className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-300">
              No tokens? Hold 5,000.000 for unlimited access
            </p>
            <p className="text-xs text-white mt-1">0%</p>
          </div>
          <button className="text-xs text-white hover:text-white font-medium whitespace-nowrap">
            Get Tokens
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Total Scans</span>
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.totalScans.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Updated {new Date().toLocaleTimeString()}</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Badges Minted</span>
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.badgesMinted}</div>
            <div className="text-xs text-gray-500">75+ threshold</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Avg Score</span>
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="text-3xl font-bold mb-1">{stats.avgScore}</div>
            <div className="text-xs text-gray-500">All scans</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">New Scan</h3>
                  <p className="text-xs text-gray-400">Enter a wallet address to analyze</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Wallet Address</label>
                <div className="relative">
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Enter Solana address (base58, e.g., 7xK5tg..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white hover:text-white">
                    Blockchain Solana
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-start space-x-2 text-sm text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 rounded"
                    checked={sharePublic}
                    onChange={(e) => setSharePublic(e.target.checked)}
                  />
                  <span>Share an anonymized card to the public wall (optional)</span>
                </label>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {scanResult && (
                <div className="mb-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span className="font-semibold">Scan Complete</span>
                    </div>
                    <span className={`text-3xl font-bold ${getRiskColor(scanResult.risk_level)}`}>
                      {scanResult.score}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Risk Level:</span>
                      <span className={`px-2 py-1 rounded text-xs font-bold border ${getRiskBg(scanResult.risk_level)} ${getRiskColor(scanResult.risk_level)}`}>
                        {scanResult.risk_level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Transactions:</span>
                      <span className="text-white">{scanResult.metadata.transaction_count}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Wallet Age:</span>
                      <span className="text-white">{scanResult.metadata.wallet_age_days} days</span>
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-xs text-gray-400">{scanResult.ai_summary}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleScan}
                disabled={isScanning}
                className="w-full py-3 bg-white hover:bg-gray-100 disabled:bg-gray-700 disabled:cursor-not-allowed text-black disabled:text-gray-500 font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Scanning...</span>
                  </>
                ) : (
                  <span>Scan Wallet</span>
                )}
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <span className="text-white mr-2">?</span>
                How It Works
              </h3>
              <ol className="space-y-2 text-sm text-gray-400">
                <li>1. Enter any Solana wallet address (no wallet connection required)</li>
                <li>2. Get a security risk score in-100, with AI analysis</li>
                <li>3. Score ≥75? Mint a verifiable on-chain Safety Badge</li>
              </ol>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-red-400 flex items-center">
                  <Gift className="w-4 h-4 mr-2" />
                  Token Holder Benefits
                </h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-400">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></span>
                  <span className="text-white">Unlimited API access</span> - no rate limits
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></span>
                  <span className="text-white">Priority support</span> - faster responses
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></span>
                  <span className="text-white">Early access</span> to new features
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></span>
                  <span className="text-white">Community perks</span> and exclusive access
                </li>
              </ul>
              <button className="w-full mt-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2 border border-white/30">
                <Gift className="w-4 h-4" />
                <span>Get Tokens Now</span>
              </button>
            </div>
          </div>

          <div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Your Recent Scans</h3>
                <button
                  onClick={loadRecentScans}
                  className="text-xs text-white hover:text-white"
                >
                  Refresh
                </button>
              </div>
              {recentScans.length === 0 ? (
                <div className="py-8 text-center border-2 border-dashed border-gray-800 rounded-lg">
                  <p className="text-gray-500 text-sm">No recent public scans</p>
                  <p className="text-xs text-gray-600 mt-1">Scan a wallet and share it publicly</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentScans.map((scan) => (
                    <div
                      key={scan.id}
                      className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-gray-300">
                          {shortenAddress(scan.wallet_address, 4)}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getRiskBg(scan.risk_level)} ${getRiskColor(scan.risk_level)}`}>
                          {scan.risk_level}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(scan.created_at).toLocaleDateString()}
                        </span>
                        <span className={`text-lg font-bold ${getRiskColor(scan.risk_level)}`}>
                          {scan.risk_score}<span className="text-xs text-gray-500">/100</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-6">
              <h3 className="font-semibold mb-6">Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Deterministic</h4>
                  <p className="text-xs text-gray-400">Same wallet, same score</p>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">On-Chain</h4>
                  <p className="text-xs text-gray-400">Verifiable SFT badges</p>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Private</h4>
                  <p className="text-xs text-gray-400">No wallet connection needed</p>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Fast</h4>
                  <p className="text-xs text-gray-400">Results in seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
