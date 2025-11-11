import { CheckCircle2 } from 'lucide-react';

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Roadmap</h1>
          <p className="text-gray-400">Our journey to becoming the reputation layer for Web3</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/8 transition-all duration-300">
            <div className="bg-emerald-500/10 border-b border-emerald-500/30 px-6 py-3">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  CURRENT
                </span>
                <span className="text-sm text-gray-400">Oct 2025 - Jan 2026</span>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-white text-sm font-semibold mb-2">PHASE 1</h3>
                <h2 className="text-2xl font-bold mb-2">Launch & Validation</h2>
                <p className="text-gray-400 text-sm">Establish product-market fit and core infrastructure</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">1,000</div>
                  <div className="text-xs text-gray-500">Badges Minted</div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">5</div>
                  <div className="text-xs text-gray-500">Project Partners</div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">$5K</div>
                  <div className="text-xs text-gray-500">MRR Target</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-3 text-gray-400">KEY DELIVERABLES</h4>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Smart contract deployment & security audit</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Core API development</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">First project integrations</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Community building & feedback loops</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Free/low-cost minting program</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/8 transition-all duration-300">
            <div className="bg-white/10 border-b border-white/30 px-6 py-3">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-white/20 text-white border border-white/30">
                  UPCOMING
                </span>
                <span className="text-sm text-gray-400">Feb 2026 - Apr 2026</span>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-white text-sm font-semibold mb-2">PHASE 2</h3>
                <h2 className="text-2xl font-bold mb-2">Scale & Revenue</h2>
                <p className="text-gray-400 text-sm">Drive adoption and establish revenue streams</p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">10,000</div>
                  <div className="text-xs text-gray-500">Badges Target</div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">20+</div>
                  <div className="text-xs text-gray-500">Integrations</div>
                </div>
                <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white mb-1">$25K</div>
                  <div className="text-xs text-gray-500">MRR Target</div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-3 text-gray-400">KEY DELIVERABLES</h4>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded mr-2 mt-0.5 flex-shrink-0"></div>
                    <span>Premium API tiers with advanced features</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded mr-2 mt-0.5 flex-shrink-0"></div>
                    <span>White-label solutions for DAOs/protocols</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded mr-2 mt-0.5 flex-shrink-0"></div>
                    <span>Multi-chain expansion (EVM, Cosmos)</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded mr-2 mt-0.5 flex-shrink-0"></div>
                    <span>Enhanced AI models & custom scoring</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded mr-2 mt-0.5 flex-shrink-0"></div>
                    <span>Mobile app launch</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/8 transition-all duration-300">
            <div className="bg-gray-700/10 border-b border-gray-700/30 px-6 py-3">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-gray-700/20 text-gray-400 border border-gray-700/30">
                  FUTURE
                </span>
                <span className="text-sm text-gray-400">May 2026+</span>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-white text-sm font-semibold mb-2">PHASE 3</h3>
                <h2 className="text-2xl font-bold mb-2">Ecosystem & Network Effects</h2>
                <p className="text-gray-400 text-sm">Become the standard for Web3 reputation</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-sm mb-3 text-gray-400">VISION</h4>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded mr-2 mt-0.5 flex-shrink-0"></div>
                    <span>Decentralized oracle network for scores</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded mr-2 mt-0.5 flex-shrink-0"></div>
                    <span>Community-driven scoring parameters</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded mr-2 mt-0.5 flex-shrink-0"></div>
                    <span>Reputation marketplace & data platform</span>
                  </li>
                  <li className="flex items-start text-sm text-gray-400">
                    <div className="w-4 h-4 border-2 border-gray-600 rounded mr-2 mt-0.5 flex-shrink-0"></div>
                    <span>Strategic partnerships & acquisitions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white/5 border border-white/30 rounded-xl p-6 text-center hover:bg-white/8 transition-all duration-300">
          <p className="text-gray-400 text-sm">
            This roadmap is subject to change based on community feedback and market conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
