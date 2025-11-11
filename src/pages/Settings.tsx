import { User, Shield, Bell, Info, Github, FileText, Copy, Check, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { shortenAddress } from '../lib/solana';
import PaymentNavigation from '../components/PaymentNavigation';

export default function Settings() {
  const { publicKey, disconnect } = useWallet();
  const [autoScan, setAutoScan] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-400 text-sm">Manage your account and preferences</p>
        </div>

        {/* Connected Wallet Section */}
        <div className="bg-[#0d1117] border border-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg mb-1">Connected Wallet</h2>
              <p className="text-sm text-gray-400">Your Solana wallet address</p>
            </div>
          </div>

          {publicKey ? (
            <>
              <div className="relative mb-4">
                <input
                  type="text"
                  value={publicKey.toBase58()}
                  readOnly
                  className="w-full px-4 py-3 pr-12 bg-black/50 border border-gray-700 rounded-lg text-white font-mono text-sm focus:outline-none"
                />
                <button
                  onClick={handleCopyAddress}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded transition-all duration-300"
                  aria-label={copied ? 'Copied' : 'Copy address'}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>

              <button
                onClick={handleDisconnect}
                className="w-full px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-lg transition-colors border border-red-500/30 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Disconnect Wallet
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400 text-sm mb-4">No wallet connected</p>
              <button className="px-6 py-2 bg-white hover:bg-gray-100 text-black font-semibold rounded-lg transition-colors">
                Connect Wallet
              </button>
            </div>
          )}
        </div>

        {/* Preferences Section */}
        <div className="bg-[#0d1117] border border-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg mb-1">Preferences</h2>
              <p className="text-sm text-gray-400">Configure security and notifications</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Auto Security Scan */}
            <div className="flex items-start justify-between py-4 border-b border-gray-800">
              <div className="flex-1">
                <h3 className="font-medium mb-1">Auto Security Scan</h3>
                <p className="text-sm text-gray-400">Automatically scan recipient wallets</p>
              </div>
              <button
                onClick={() => setAutoScan(!autoScan)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  autoScan ? 'bg-white' : 'bg-gray-700'
                }`}
                aria-label="Toggle auto security scan"
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    autoScan ? 'translate-x-7' : ''
                  }`}
                />
              </button>
            </div>

            {/* Push Notifications */}
            <div className="flex items-start justify-between py-4">
              <div className="flex-1">
                <h3 className="font-medium mb-1">Push Notifications</h3>
                <p className="text-sm text-gray-400">Get notified about transactions</p>
              </div>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  pushNotifications ? 'bg-white' : 'bg-gray-700'
                }`}
                aria-label="Toggle push notifications"
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    pushNotifications ? 'translate-x-7' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-[#0d1117] border border-gray-800 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Info className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg mb-1">About ScoutyPay</h2>
              <p className="text-sm text-gray-400">Version 1.0.0 • Built with SmartScan AI</p>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 border border-white/10"
            >
              <Github className="w-5 h-5 text-gray-400" />
              <span className="text-sm">View on GitHub</span>
            </a>

            <a
              href="/docs"
              className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-300 border border-white/10"
            >
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-sm">Documentation</span>
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>© 2025 Scouty. Built for Solana.</span>
              <div className="flex items-center gap-2">
                <a href="/security" className="hover:text-gray-300 transition-colors">
                  Security
                </a>
                <span>•</span>
                <a href="/docs" className="hover:text-gray-300 transition-colors">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentNavigation />
    </div>
  );
}
