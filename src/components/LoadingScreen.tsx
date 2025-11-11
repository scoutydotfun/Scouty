import { useEffect, useState } from 'react';
import { Shield, Lock, Zap } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'loading' | 'ready' | 'complete'>('loading');

  useEffect(() => {
    // Simulate loading stages with realistic timing
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setStage('ready');
          return 100;
        }
        // Non-linear progress for more natural feel
        const increment = prev < 60 ? 8 : prev < 90 ? 4 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (stage === 'ready') {
      // Brief pause before transition
      const readyTimeout = setTimeout(() => {
        setStage('complete');
        // Delay callback to allow exit animation
        setTimeout(onLoadingComplete, 800);
      }, 500);

      return () => clearTimeout(readyTimeout);
    }
  }, [stage, onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-all duration-800 ${
        stage === 'complete' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="grid-background"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animation */}
        <div
          className={`relative mb-8 transition-transform duration-1000 ${
            stage === 'ready' ? 'scale-110' : 'scale-100'
          }`}
        >
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 -m-8 rounded-full bg-white/20 blur-3xl animate-pulse-glow"></div>

          {/* Rotating Ring */}
          <div className="absolute inset-0 -m-4">
            <div className="w-32 h-32 rounded-full border-2 border-white/30 border-t-cyan-500 animate-spin-slow"></div>
          </div>

          {/* Logo Container */}
          <div className="relative w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
            <Shield className="w-14 h-14 text-black" />
          </div>

          {/* Security Icons Orbit */}
          <div className="absolute inset-0 -m-8 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '4s' }}>
            <Lock className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 text-white" />
            <Zap className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-5 text-yellow-400" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
          Scouty
        </h1>
        <p className="text-white text-sm font-medium mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Smart Security for Solana
        </p>

        {/* Progress Bar Container */}
        <div className="w-64 mb-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {/* Progress Bar Track */}
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-shimmer"></div>

            {/* Progress Fill */}
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 blur-sm opacity-75"></div>
            </div>
          </div>

          {/* Progress Text */}
          <div className="flex justify-between items-center mt-2 text-xs">
            <span className="text-gray-400">Loading...</span>
            <span className="text-white font-mono font-bold">{progress}%</span>
          </div>
        </div>

        {/* Loading Status */}
        <div className="text-gray-500 text-xs animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {progress < 30 && 'Initializing security protocols...'}
          {progress >= 30 && progress < 60 && 'Connecting to Solana network...'}
          {progress >= 60 && progress < 90 && 'Loading AI models...'}
          {progress >= 90 && progress < 100 && 'Preparing interface...'}
          {progress === 100 && stage === 'ready' && (
            <span className="text-emerald-400 font-medium">✓ Ready!</span>
          )}
        </div>

        {/* Security Features Badges */}
        <div className="flex gap-4 mt-8 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/30 rounded-lg">
            <Shield className="w-3 h-3 text-white" />
            <span className="text-xs text-gray-400">Secure</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span className="text-xs text-gray-400">Encrypted</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span className="text-xs text-gray-400">Fast</span>
          </div>
        </div>
      </div>

      <style>{`
        .grid-background {
          background-image:
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-scroll 20s linear infinite;
        }

        @keyframes grid-scroll {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  );
}
