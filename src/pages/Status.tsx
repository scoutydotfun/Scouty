import { RefreshCw, CheckCircle2 } from 'lucide-react';

export default function Status() {
  const services = [
    { name: 'API Endpoints', uptime: '99.98%', response: '140ms', status: 'Operational' },
    { name: 'Wallet Scanner', uptime: '99.95%', response: '1.2s', status: 'Operational' },
    { name: 'Badge Minting', uptime: '99.96%', response: '3.5s', status: 'Operational' },
    { name: 'Solana RPC', uptime: '99.89%', response: '380ms', status: 'Operational' },
    { name: 'Database', uptime: '99.99%', response: '25ms', status: 'Operational' },
    { name: 'AI Analysis', uptime: '99.87%', response: '2.1s', status: 'Operational' },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">System Status</h1>
          <p className="text-gray-400">Live status and availability for Scouty services</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div>
                <h2 className="text-xl font-semibold">All Systems Operational</h2>
                <p className="text-sm text-gray-500">
                  Last updated: 09/11/2025, 11:51:53 UTC • just now
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition-all duration-300 text-sm flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all duration-300">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Last 24 Hours</div>
            <div className="text-3xl font-bold text-emerald-400">100%</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all duration-300">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Last 7 Days</div>
            <div className="text-3xl font-bold text-emerald-400">99.96%</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all duration-300">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Last 30 Days</div>
            <div className="text-3xl font-bold text-emerald-400">99.94%</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all duration-300">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Last 90 Days</div>
            <div className="text-3xl font-bold text-emerald-400">99.92%</div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Services</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden divide-y divide-gray-800">
            {services.map((service, index) => (
              <div key={index} className="p-6 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-xs text-gray-500">
                        Uptime: {service.uptime} • Avg response: {service.response}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {service.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Incident History</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <p className="text-gray-400">No incidents in the last 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
