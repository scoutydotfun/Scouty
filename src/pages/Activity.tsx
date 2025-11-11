import { Search, BarChart3, RefreshCw, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase } from '../lib/supabase';
import { shortenAddress } from '../lib/solana';
import PaymentNavigation from '../components/PaymentNavigation';

interface Transaction {
  id: string;
  wallet_address: string;
  recipient_address: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  transaction_signature: string;
  created_at: string;
}

export default function Activity() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'sent' | 'received'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      loadTransactions();
    }
  }, [publicKey, activeFilter]);

  const loadTransactions = async () => {
    if (!publicKey) return;

    setLoading(true);
    try {
      let query = supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (activeFilter === 'sent') {
        query = query.eq('wallet_address', publicKey.toBase58());
      } else if (activeFilter === 'received') {
        query = query.eq('recipient_address', publicKey.toBase58());
      } else {
        query = query.or(`wallet_address.eq.${publicKey.toBase58()},recipient_address.eq.${publicKey.toBase58()}`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    if (!searchQuery) return true;
    return (
      tx.wallet_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.recipient_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.transaction_signature.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getTransactionCount = (filter: 'all' | 'sent' | 'received') => {
    if (!publicKey) return 0;

    if (filter === 'sent') {
      return transactions.filter(tx => tx.wallet_address === publicKey.toBase58()).length;
    } else if (filter === 'received') {
      return transactions.filter(tx => tx.recipient_address === publicKey.toBase58()).length;
    }
    return transactions.length;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Recent Activity</h1>
              <p className="text-gray-400 text-sm">Your payment history and transactions</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={loadTransactions}
                className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg transition-all duration-300"
                aria-label="Refresh transactions"
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button
                onClick={loadTransactions}
                className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg transition-all duration-300"
                aria-label="Reload transactions"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by address or signature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#0d1117] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium text-sm transition-all ${
              activeFilter === 'all'
                ? 'bg-white/20 text-white border border-white/30'
                : 'bg-[#0d1117] text-gray-400 border border-gray-800 hover:border-gray-700'
            }`}
          >
            All ({getTransactionCount('all')})
          </button>
          <button
            onClick={() => setActiveFilter('sent')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium text-sm transition-all ${
              activeFilter === 'sent'
                ? 'bg-white/20 text-white border border-white/30'
                : 'bg-[#0d1117] text-gray-400 border border-gray-800 hover:border-gray-700'
            }`}
          >
            Sent ({getTransactionCount('sent')})
          </button>
          <button
            onClick={() => setActiveFilter('received')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium text-sm transition-all ${
              activeFilter === 'received'
                ? 'bg-white/20 text-white border border-white/30'
                : 'bg-[#0d1117] text-gray-400 border border-gray-800 hover:border-gray-700'
            }`}
          >
            Received ({getTransactionCount('received')})
          </button>
        </div>

        {/* Transaction List */}
        <div className="bg-[#0d1117] border border-gray-800 rounded-xl overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <RefreshCw className="w-8 h-8 text-gray-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-400">Loading transactions...</p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="py-20 text-center">
              <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No transactions yet</h3>
              <p className="text-gray-400 text-sm mb-6">
                {searchQuery
                  ? 'No transactions match your search.'
                  : 'Your transactions will appear here once you start sending or receiving payments.'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 bg-white hover:bg-gray-100 text-black font-medium rounded-lg transition-colors"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {filteredTransactions.map((tx) => {
                const isSent = publicKey && tx.wallet_address === publicKey.toBase58();
                const statusColor =
                  tx.status === 'completed'
                    ? 'text-emerald-400'
                    : tx.status === 'pending'
                    ? 'text-yellow-400'
                    : 'text-red-400';

                return (
                  <div
                    key={tx.id}
                    className="p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              isSent
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-emerald-500/20 text-emerald-400'
                            }`}
                          >
                            {isSent ? 'Sent' : 'Received'}
                          </span>
                          <span className={`text-xs font-medium ${statusColor}`}>
                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-gray-400">
                            {isSent ? 'To:' : 'From:'}
                          </span>
                          <span className="text-sm text-white font-mono">
                            {shortenAddress(
                              isSent ? tx.recipient_address : tx.wallet_address,
                              8
                            )}
                          </span>
                        </div>
                        <a
                          href={`https://solscan.io/tx/${tx.transaction_signature}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white hover:text-white font-mono"
                        >
                          {shortenAddress(tx.transaction_signature, 12)}
                        </a>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold mb-1 ${
                            isSent ? 'text-red-400' : 'text-emerald-400'
                          }`}
                        >
                          {isSent ? '-' : '+'} {tx.amount} SOL
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(tx.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <PaymentNavigation />
    </div>
  );
}
