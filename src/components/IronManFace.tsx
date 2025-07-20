import React from 'react';

interface IronManFaceProps {
  isActive: boolean;
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
}

export const IronManFace: React.FC<IronManFaceProps> = ({
  isActive,
  isListening,
  isProcessing,
  isSpeaking,
}) => {
  const getAnimationState = () => {
    if (isSpeaking) return 'speaking';
    if (isProcessing) return 'processing';
    if (isListening) return 'listening';
    if (isActive) return 'active';
    return 'inactive';
  };

  const animationState = getAnimationState();

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Outer rotating ring */}
      <div className={`absolute inset-0 rounded-full border-2 border-cyan-400/30 ${
        isActive ? 'animate-spin' : ''
      }`} style={{ animationDuration: '20s' }}>
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-cyan-400/50"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 translate-y-1/2 shadow-lg shadow-cyan-400/50"></div>
        <div className="absolute left-0 top-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-cyan-400/50"></div>
        <div className="absolute right-0 top-1/2 w-2 h-2 bg-cyan-400 rounded-full transform translate-x-1/2 -translate-y-1/2 shadow-lg shadow-cyan-400/50"></div>
      </div>

      {/* Middle rotating ring */}
      <div className={`absolute inset-4 rounded-full border border-blue-400/40 ${
        isActive ? 'animate-spin' : ''
      }`} style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
        <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-md shadow-blue-400/50"></div>
        <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full transform -translate-x-1/2 translate-y-1/2 shadow-md shadow-blue-400/50"></div>
      </div>

      {/* Inner core */}
      <div className={`absolute inset-8 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-300/50 backdrop-blur-sm ${
        animationState === 'speaking' ? 'animate-pulse' : 
        animationState === 'processing' ? 'animate-bounce' :
        animationState === 'listening' ? 'animate-ping' : ''
      }`}>
        {/* Central eye/core */}
        <div className={`absolute inset-6 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 shadow-2xl ${
          isActive ? 'shadow-cyan-400/60' : 'shadow-gray-400/20'
        } ${animationState === 'speaking' ? 'animate-pulse' : ''}`}>
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
          
          {/* Pupil/center dot */}
          <div className={`absolute top-1/2 left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
            isActive ? 'bg-white shadow-lg shadow-white/50' : 'bg-gray-400'
          } ${animationState === 'processing' ? 'animate-ping' : ''}`}></div>
        </div>

        {/* Arc segments around the core */}
        <div className="absolute inset-0">
          {/* Top arc */}
          <div className={`absolute top-0 left-1/2 w-16 h-8 border-t-2 border-l-2 border-r-2 border-cyan-400 rounded-t-full transform -translate-x-1/2 -translate-y-2 ${
            animationState === 'listening' ? 'animate-pulse' : ''
          }`}></div>
          
          {/* Bottom arc */}
          <div className={`absolute bottom-0 left-1/2 w-16 h-8 border-b-2 border-l-2 border-r-2 border-cyan-400 rounded-b-full transform -translate-x-1/2 translate-y-2 ${
            animationState === 'speaking' ? 'animate-pulse' : ''
          }`}></div>
          
          {/* Left arc */}
          <div className={`absolute left-0 top-1/2 w-8 h-16 border-l-2 border-t-2 border-b-2 border-blue-400 rounded-l-full transform -translate-x-2 -translate-y-1/2 ${
            animationState === 'processing' ? 'animate-pulse' : ''
          }`}></div>
          
          {/* Right arc */}
          <div className={`absolute right-0 top-1/2 w-8 h-16 border-r-2 border-t-2 border-b-2 border-blue-400 rounded-r-full transform translate-x-2 -translate-y-1/2 ${
            animationState === 'processing' ? 'animate-pulse' : ''
          }`}></div>
        </div>
      </div>

      {/* Scanning lines */}
      {isActive && (
        <>
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent ${
              animationState === 'listening' ? 'animate-ping' : ''
            }`} style={{
              animation: 'scan-vertical 3s linear infinite'
            }}></div>
          </div>
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className={`absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent ${
              animationState === 'processing' ? 'animate-ping' : ''
            }`} style={{
              animation: 'scan-horizontal 2.5s linear infinite'
            }}></div>
          </div>
        </>
      )}

      {/* Outer glow effect */}
      <div className={`absolute inset-0 rounded-full ${
        isActive ? 'shadow-2xl shadow-cyan-400/30' : 'shadow-lg shadow-gray-400/10'
      } ${animationState === 'speaking' ? 'animate-pulse' : ''}`}></div>

      {/* Status indicator text */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className={`px-4 py-2 rounded-full text-xs font-medium backdrop-blur-sm border ${
          animationState === 'speaking' ? 'bg-green-500/20 border-green-400/50 text-green-300' :
          animationState === 'processing' ? 'bg-yellow-500/20 border-yellow-400/50 text-yellow-300' :
          animationState === 'listening' ? 'bg-blue-500/20 border-blue-400/50 text-blue-300' :
          animationState === 'active' ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300' :
          'bg-gray-500/20 border-gray-400/50 text-gray-300'
        }`}>
          {animationState === 'speaking' ? 'SPEAKING' :
           animationState === 'processing' ? 'PROCESSING' :
           animationState === 'listening' ? 'LISTENING' :
           animationState === 'active' ? 'STANDBY' : 'OFFLINE'}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan-vertical {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes scan-horizontal {
          0% { left: 0%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};