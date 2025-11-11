import { ArrowRight, Copy, FileText, Github, MessageSquare, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { scanWallet } from '../lib/api';
import { isValidSolanaAddress } from '../lib/solana';

export default function Playground() {
  const [walletAddress, setWalletAddress] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('curl');
  const [response, setResponse] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const codeExamples = {
    curl: `curl -X POST https://scouty.fun/api/scan \\
  -H "Content-Type: application/json" \\
  -d '{
    "wallet": ""
  }'`,
    javascript: `fetch('https://scouty.fun/api/scan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ wallet: '' })
})`,
    python: `import requests

requests.post('https://scouty.fun/api/scan',
  json={"wallet": ""})`,
    typescript: `const response = await fetch('https://scouty.fun/api/scan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ wallet: '' })
})`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeLanguage as keyof typeof codeExamples]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = async () => {
    if (!walletAddress || !isValidSolanaAddress(walletAddress)) {
      setError('Please enter a valid Solana wallet address');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await scanWallet(walletAddress);
      setResponse(JSON.stringify(result, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to scan wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4">API Playground</h1>
          <p className="text-gray-400 text-lg">Test the Scouty API in real-time</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            No API Key
          </span>
          <span className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-medium bg-white/20 text-white border border-white/30">
            100 req/min
          </span>
          <button className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-medium bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-gray-800 transition-colors">
            <FileText className="w-3.5 h-3.5 mr-2" />
            Docs
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Request</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Wallet Address</label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter Solana wallet address"
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm"
                />
              </div>

              <button
                onClick={handleExecute}
                disabled={loading || !walletAddress}
                className="w-full py-3 bg-white/10 border border-white/20 hover:bg-white/15 disabled:bg-gray-800 disabled:text-gray-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    <span>Execute Request</span>
                  </>
                )}
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="border-b border-gray-800 p-5">
                <h3 className="font-semibold mb-4">Code Examples</h3>
                <div className="flex gap-2">
                  {Object.keys(codeExamples).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLanguage(lang)}
                      className={`px-3 py-1.5 text-xs font-medium rounded transition-all ${
                        activeLanguage === lang
                          ? 'bg-white text-black'
                          : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-5 relative bg-black/30">
                <button
                  onClick={handleCopy}
                  className="absolute top-7 right-7 p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded transition-colors group"
                >
                  <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                </button>
                {copied && (
                  <span className="absolute top-7 right-16 text-xs text-emerald-400 font-medium">Copied!</span>
                )}
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code className="language-bash">{codeExamples[activeLanguage as keyof typeof codeExamples]}</code>
                </pre>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 min-h-[500px]">
              <h2 className="text-xl font-semibold mb-6">Response</h2>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              {loading ? (
                <div className="flex flex-col items-center justify-center h-80 text-gray-500">
                  <Loader2 className="w-12 h-12 mb-4 text-white animate-spin" />
                  <p className="text-sm">Analyzing wallet...</p>
                </div>
              ) : !response ? (
                <div className="flex flex-col items-center justify-center h-80 text-gray-500">
                  <div className="w-20 h-20 mb-4 bg-gray-800/50 rounded-xl flex items-center justify-center">
                    <FileText className="w-10 h-10 text-gray-600" />
                  </div>
                  <p className="text-sm text-center">Execute a request to see the response</p>
                </div>
              ) : (
                <div className="bg-black/30 rounded-lg p-5 border border-gray-800">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{response}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#0d1117] to-gray-900/50 border border-gray-800 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">Open Source & Community Driven</h3>
              <p className="text-gray-400">
                Scouty is developed openly. Star our repository, participate, or submit feedback on GitHub.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2 border border-gray-700">
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </button>
              <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm font-medium border border-white/30 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Report Issue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
