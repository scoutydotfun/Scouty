import { useState, useEffect } from 'react';
import { Copy, CheckCircle, ExternalLink, Loader2 } from 'lucide-react';
import { getActiveContractAddress, ContractAddress as ContractAddressType } from '../lib/api';

export default function ContractAddress() {
  const [contractAddress, setContractAddress] = useState<ContractAddressType | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContractAddress();
  }, []);

  const fetchContractAddress = async () => {
    try {
      setLoading(true);
      setError(null);
      const address = await getActiveContractAddress();
      setContractAddress(address);
    } catch (err) {
      setError('Failed to load contract address');
      console.error('Error fetching contract address:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!contractAddress?.token_address) return;

    try {
      await navigator.clipboard.writeText(contractAddress.token_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const truncateAddress = (address: string) => {
    if (address.length <= 20) return address;
    return `${address.slice(0, 10)}...${address.slice(-7)}`;
  };

  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-lg p-3">
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span className="text-xs">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !contractAddress) {
    return null;
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/[0.07] transition-colors">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              {contractAddress.network}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <code className="text-xs font-mono text-white">
              {truncateAddress(contractAddress.token_address)}
            </code>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded transition-all group relative"
            title="Copy address"
          >
            {copied ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
            )}
            {copied && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-500/90 text-white text-[10px] rounded whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>

          <a
            href={`https://solscan.io/token/${contractAddress.token_address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded transition-all group"
            title="View on Solscan"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
          </a>
        </div>
      </div>

      {contractAddress.label && (
        <div className="mt-1.5 pt-1.5 border-t border-white/10">
          <span className="text-[10px] text-gray-500">{contractAddress.label}</span>
        </div>
      )}
    </div>
  );
}
