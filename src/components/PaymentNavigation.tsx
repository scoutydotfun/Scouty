import { CreditCard, Activity, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PaymentNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0d1117] border-t border-gray-800 z-50">
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex justify-around">
          <button
            className={`flex flex-col items-center gap-1 transition-colors min-w-[80px] ${
              currentPath === '/scoutypay' || currentPath === '/solenceaipay'
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => navigate('/scoutypay')}
            aria-label="Payments"
          >
            <div
              className={`p-2 rounded-lg ${
                currentPath === '/scoutypay' || currentPath === '/solenceaipay'
                  ? 'bg-white/20'
                  : ''
              }`}
            >
              <CreditCard className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Payments</span>
          </button>
          <button
            className={`flex flex-col items-center gap-1 transition-colors min-w-[80px] ${
              currentPath === '/activity' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => navigate('/activity')}
            aria-label="Activity"
          >
            <div className={`p-2 rounded-lg ${currentPath === '/activity' ? 'bg-white/20' : ''}`}>
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Activity</span>
          </button>
          <button
            className={`flex flex-col items-center gap-1 transition-colors min-w-[80px] ${
              currentPath === '/settings' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
            }`}
            onClick={() => navigate('/settings')}
            aria-label="Settings"
          >
            <div className={`p-2 rounded-lg ${currentPath === '/settings' ? 'bg-white/20' : ''}`}>
              <Settings className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
