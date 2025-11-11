import { RefreshCw, Info, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPublicScans, subscribeToPublicScans } from '../lib/api';
import type { WalletScan } from '../lib/supabase';
import { shortenAddress } from '../lib/solana';

export default function Wall() {
  const [synced, setSynced] = useState('Just now');
  const [scans, setScans] = useState<WalletScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadScans();

    const subscription = subscribeToPublicScans((newScan) => {
      setScans((prev) => [newScan, ...prev].slice(0, 50));
      setSynced('Just now');
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadScans = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      setError(null);

      const data = await getPublicScans(50);
      setScans(data || []);
      setSynced('Just now');
    } catch (error: any) {
      console.error('Failed to load scans:', error);
      setError(error.message || 'Failed to load scans. Please try again.');
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW':
        return 'text-emerald-400';
      case 'HIGH':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  const handleRefresh = () => {
    loadScans(true);
  };

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">Public Wall</h1>
          <p className="text-gray-400 text-lg">
            These reports were <span className="text-white font-semibold">explicitly shared</span> by users. Wallets are anonymized. No doxxing. No scraping.
          </p>
        </div>

        <div className="bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-base mb-1">Community Feed</h2>
                <p className="text-xs text-gray-500">
                  Last updated: 09/11/2025, 12:09:52 UTC • {synced}
                </p>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 border border-gray-700 self-start sm:self-center"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>

          <div className="divide-y divide-gray-800">
            {loading ? (
              <div className="p-12 text-center text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-white" />
                <p className="text-sm">Loading scans...</p>
              </div>
            ) : error ? (
              <div className="p-12 text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-3 text-red-400" />
                <p className="text-sm text-red-400 mb-3">{error}</p>
                <button
                  onClick={() => loadScans(true)}
                  className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Try Again
                </button>
              </div>
            ) : scans.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <p className="text-sm">No public scans yet. Be the first to share!</p>
              </div>
            ) : (
              scans.map((scan) => (
                <div
                  key={scan.id}
                  className="p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-mono text-sm text-gray-300">
                          {shortenAddress(scan.wallet_address, 6)}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold ${
                          scan.risk_level === 'LOW'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : scan.risk_level === 'MEDIUM'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {scan.risk_level}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{getTimeAgo(scan.created_at)}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`text-4xl font-bold ${getRiskColor(scan.risk_level)} leading-none`}>
                        {scan.risk_score}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">/ 100</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Showing {scans.length} most recent scans
          </p>
        </div>
      </div>
    </div>
  );
}
