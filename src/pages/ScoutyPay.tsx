import { Lock, Zap, ChevronDown, Info, AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { scanWallet, ScanResult } from '../lib/api';
import { isValidSolanaAddress, LAMPORTS_PER_SOL } from '../lib/solana';
import PaymentNavigation from '../components/PaymentNavigation';

export default function ScoutyPay() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txSignature, setTxSignature] = useState<string | null>(null);

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const handleScanRecipient = async () => {
    if (!recipient || !isValidSolanaAddress(recipient)) {
      setError('Please enter a valid Solana wallet address');
      return;
    }

    setError(null);
    setScanning(true);
    setScanResult(null);

    try {
      const result = await scanWallet(recipient);
      setScanResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan wallet');
    } finally {
      setScanning(false);
    }
  };

  const handleSendPayment = async () => {
    if (!publicKey || !recipient || !amount || !scanResult) {
      return;
    }

    setSending(true);
    setError(null);
    setTxSignature(null);

    try {
      const recipientPubkey = new PublicKey(recipient);
      const lamports = Math.floor(parseFloat(amount) * LAMPORTS_PER_SOL);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      setTxSignature(signature);
      setRecipient('');
      setAmount('');
      setScanResult(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
    } finally {
      setSending(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'MEDIUM':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'HIGH':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 animate-slide-down">
          <h1 className="text-3xl font-bold mb-1">ScoutyPay</h1>
          <p className="text-gray-400 text-sm">
            Built on <span className="text-white font-medium">OpenLibAi02</span>
          </p>
          <p className="text-gray-400 text-sm">#1 AI-secured payments</p>
        </div>

        <div className="mb-6 p-3.5 bg-white/10 border border-white/30 rounded-lg flex items-start animate-slide-up transition-all-300 hover:bg-white/15">
          <Info className="w-4 h-4 text-white mr-2.5 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-300">
            <span className="font-medium text-white">Connect your wallet</span> to send AI-protected payments
          </p>
        </div>

        <div className="bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden mb-6 animate-scale-in hover-lift">
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Recipient Address
                </label>
                <span className="text-xs text-gray-500 font-medium">Solana</span>
              </div>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter Solana wallet address"
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all-300 text-sm input-focus"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
              <div className="relative">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all-300 text-sm pr-32 input-focus"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button className="px-3 py-1.5 bg-white/20 text-white text-xs font-medium rounded hover:bg-white/30 transition-all-300 border border-white/30 hover-glow button-press">
                    Max
                  </button>
                  <span className="px-3 py-1.5 bg-gray-700/80 text-white text-xs rounded font-medium">
                    SOL
                  </span>
                </div>
              </div>
            </div>

            {!publicKey ? (
              <button
                disabled
                className="w-full py-3.5 bg-gray-700 text-gray-400 font-semibold rounded-lg cursor-not-allowed text-sm transition-all-300"
              >
                Connect Wallet to Continue
              </button>
            ) : !scanResult ? (
              <button
                onClick={handleScanRecipient}
                disabled={!recipient || !isValidSolanaAddress(recipient) || scanning}
                className="w-full py-3.5 bg-white hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-400 text-black font-semibold rounded-lg transition-all-300 text-sm disabled:cursor-not-allowed hover-glow button-press relative overflow-hidden"
              >
                {scanning && <span className="absolute inset-0 animate-shimmer"></span>}
                <span className="relative z-10">{scanning ? 'Scanning Recipient...' : 'Scan Recipient'}</span>
              </button>
            ) : (
              <button
                onClick={handleSendPayment}
                disabled={!amount || parseFloat(amount) <= 0 || sending}
                className="w-full py-3.5 bg-white hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-400 text-black font-semibold rounded-lg transition-all-300 text-sm disabled:cursor-not-allowed hover-glow button-press relative overflow-hidden"
              >
                {sending && <span className="absolute inset-0 animate-shimmer"></span>}
                <span className="relative z-10">{sending ? 'Sending...' : `Send ${amount || '0'} SOL`}</span>
              </button>
            )}
          </div>

          <div className="border-t border-gray-800 px-6 py-4 bg-black/30">
            <div className="flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-white" />
                <span className="text-gray-400">AI Protected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-gray-400">Non-Custodial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span className="text-gray-400">Open-Source</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 animate-shake animate-slide-up">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5 animate-bounce-subtle" />
            <div>
              <p className="text-sm text-red-200 font-medium">Error</p>
              <p className="text-sm text-red-300 mt-1">{error}</p>
            </div>
          </div>
        )}

        {txSignature && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-start gap-3 animate-scale-in relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent animate-shimmer"></div>
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 relative z-10" />
            <div className="flex-1 relative z-10">
              <p className="text-sm text-emerald-200 font-medium">Transaction Successful!</p>
              <a
                href={`https://solscan.io/tx/${txSignature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-400 hover:text-emerald-300 mt-1 inline-block underline transition-all-300 hover-glow"
              >
                View on Solscan →
              </a>
            </div>
          </div>
        )}

        {scanResult && (
          <div className="mb-6 bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden animate-scale-in hover-lift">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Security Analysis</h3>
                <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getRiskColor(scanResult.risk_level)} transition-all-300 animate-pulse-glow`}>
                  {scanResult.risk_level} RISK
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Risk Score</span>
                  <span className={`text-3xl font-bold ${
                    scanResult.risk_level === 'LOW' ? 'text-emerald-400' :
                    scanResult.risk_level === 'MEDIUM' ? 'text-yellow-400' : 'text-red-400'
                  } animate-fade-in`}>
                    {scanResult.score}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all-500 ${
                      scanResult.risk_level === 'LOW' ? 'bg-emerald-400' :
                      scanResult.risk_level === 'MEDIUM' ? 'bg-yellow-400' : 'bg-red-400'
                    } animate-progress`}
                    style={{ '--progress-width': `${scanResult.score}%`, width: `${scanResult.score}%` } as React.CSSProperties}
                  />
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Transactions</span>
                  <span className="text-white font-medium">{scanResult.metadata.transaction_count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Wallet Age</span>
                  <span className="text-white font-medium">{scanResult.metadata.wallet_age_days} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Token Holdings</span>
                  <span className="text-white font-medium">{scanResult.metadata.token_count} tokens</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Value</span>
                  <span className="text-white font-medium">${scanResult.metadata.total_value_usd.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <p className="text-xs text-gray-400 mb-2">Key Findings:</p>
                <ul className="space-y-1">
                  {scanResult.findings.map((finding, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-white mt-1">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {scanResult.risk_level === 'HIGH' && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-300">
                      This wallet has been flagged as high risk. Proceed with caution.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden mb-6">
          <button
            onClick={() => setHowItWorksOpen(!howItWorksOpen)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-900/30 transition-colors"
          >
            <span className="font-semibold text-sm">How it works</span>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${howItWorksOpen ? 'rotate-180' : ''}`} />
          </button>

          {howItWorksOpen && (
            <div className="px-6 pb-6 border-t border-gray-800 pt-6">
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Enter Recipient</h3>
                    <p className="text-sm text-gray-400">Paste any Solana wallet address</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">AI Scans Wallet</h3>
                    <p className="text-sm text-gray-400">Real-time security analysis checks for risks</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Approve & Send</h3>
                    <p className="text-sm text-gray-400">Review security score and send safely</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <PaymentNavigation />
    </div>
  );
}
