import { X, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-3 flex-1">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              NEW
            </span>
            <span className="text-sm text-gray-300">
              <span className="font-semibold">Introducing ScoutyPay</span> - AI-enhanced protected transactions on Solana
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-sm px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-white">
              Try it →
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
