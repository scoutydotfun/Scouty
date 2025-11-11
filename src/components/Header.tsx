import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { shortenAddress } from '../lib/solana';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { publicKey } = useWallet();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center" aria-label="Scouty Home">
            <img
              src="/logo.svg"
              alt="Scouty"
              className="h-10 w-10 hover:scale-105 transition-transform duration-200"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/app"
              className={`text-sm transition-colors ${isActive('/app') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              App
            </Link>
            <Link
              to="/scoutypay"
              className={`flex items-center space-x-1 text-sm transition-colors ${isActive('/scoutypay') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <span>ScoutyPay</span>
              <ChevronDown className="w-4 h-4" />
            </Link>
            <Link
              to="/playground"
              className={`flex items-center space-x-1 text-sm transition-colors ${isActive('/playground') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <span>Playground</span>
              <ChevronDown className="w-4 h-4" />
            </Link>
            <Link
              to="/wall"
              className={`flex items-center space-x-1 text-sm transition-colors ${isActive('/wall') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <span>Wall</span>
              <ChevronDown className="w-4 h-4" />
            </Link>
            <Link
              to="/docs"
              className={`text-sm transition-colors ${isActive('/docs') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Docs
            </Link>
            <Link
              to="/status"
              className={`text-sm transition-colors ${isActive('/status') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Status
            </Link>
            <Link
              to="/security"
              className={`text-sm transition-colors ${isActive('/security') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Security
            </Link>
            <Link
              to="/roadmap"
              className={`text-sm transition-colors ${isActive('/roadmap') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Roadmap
            </Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            {publicKey && (
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <span className="text-[10px] bg-gray-800 px-2 py-1 rounded">●</span>
                <span>{shortenAddress(publicKey.toBase58(), 6)}</span>
              </div>
            )}
            <WalletMultiButton className="!bg-white hover:!bg-gray-100 !text-black !font-medium !rounded-lg !transition-colors !text-sm !px-4 !py-2" />
          </div>

          <button
            className="lg:hidden text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <Link to="/app" className="block text-gray-300 hover:text-white transition-colors">App</Link>
            <Link to="/scoutypay" className="block text-gray-300 hover:text-white transition-colors">ScoutyPay</Link>
            <Link to="/playground" className="block text-gray-300 hover:text-white transition-colors">Playground</Link>
            <Link to="/wall" className="block text-gray-300 hover:text-white transition-colors">Wall</Link>
            <Link to="/docs" className="block text-gray-300 hover:text-white transition-colors">Docs</Link>
            <Link to="/status" className="block text-gray-300 hover:text-white transition-colors">Status</Link>
            <Link to="/security" className="block text-gray-300 hover:text-white transition-colors">Security</Link>
            <Link to="/roadmap" className="block text-gray-300 hover:text-white transition-colors">Roadmap</Link>
            {publicKey && (
              <div className="flex items-center space-x-2 text-xs text-gray-400 py-2">
                <span className="text-[10px] bg-gray-800 px-2 py-1 rounded">●</span>
                <span>{shortenAddress(publicKey.toBase58(), 6)}</span>
              </div>
            )}
            <WalletMultiButton className="!w-full !bg-white hover:!bg-gray-100 !text-black !font-medium !rounded-lg !transition-colors" />
          </div>
        </div>
      )}
    </header>
  );
}
