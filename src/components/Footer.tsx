import { Link } from 'react-router-dom';
import { Twitter, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center mb-6" aria-label="Scouty Home">
              <img
                src="/logo.svg"
                alt="Scouty"
                className="h-12 w-12 hover:scale-105 transition-transform duration-200"
              />
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Smart Solana wallet analysis powered by AI with blockchain-verified security badges.
            </p>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
              <span className="text-emerald-400">All systems normal.</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/app" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Launch App
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Docs
                </Link>
              </li>
              <li>
                <Link to="/playground" className="text-sm text-gray-400 hover:text-white transition-colors">
                  API Playground
                </Link>
              </li>
              <li>
                <Link to="/scoutypay" className="text-sm text-gray-400 hover:text-white transition-colors">
                  ScoutyPay
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/security" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Status Page
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm">Community</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://x.com/scoutydotfun" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://github.com/scoutydotfun" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <Link to="/wall" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Public Wall
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © 2025 Scouty. Built for Solana.
          </p>
          <div className="flex items-center space-x-1 text-xs">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-emerald-400">All systems normal.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
