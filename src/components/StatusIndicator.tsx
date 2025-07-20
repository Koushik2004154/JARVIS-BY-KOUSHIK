import React from 'react';
import { Brain, Ear, Volume2, Search } from 'lucide-react';
import { JarvisState } from '../types';

interface StatusIndicatorProps {
  state: JarvisState;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ state }) => {
  const getStatusInfo = () => {
    if (state.error) {
      return { icon: '⚠️', text: 'Error', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-400/30' };
    }
    
    if (state.isSpeaking) {
      return { icon: Volume2, text: 'Speaking', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-400/30' };
    }
    
    if (state.isProcessing) {
      return { icon: Brain, text: 'Thinking', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-400/30' };
    }
    
    if (state.isListening) {
      return { icon: Ear, text: 'Listening', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-400/30' };
    }
    
    if (state.isWakeActive) {
      return { icon: Search, text: 'Standby', color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-400/30' };
    }
    
    return { icon: '⭕', text: 'Inactive', color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-400/30' };
  };

  const status = getStatusInfo();
  const IconComponent = typeof status.icon === 'string' ? null : status.icon;

  return (
    <div className={`flex items-center justify-center p-4 rounded-xl backdrop-blur-md border transition-all duration-300 shadow-lg ${status.bg} ${status.border}`}>
      {IconComponent ? (
        <IconComponent className={`w-6 h-6 ${status.color} ${state.isProcessing ? 'animate-pulse' : ''}`} />
      ) : (
        <span className="text-2xl">{status.icon}</span>
      )}
      <span className={`ml-3 font-medium ${status.color}`}>
        {status.text}
      </span>
      {state.error && (
        <div className="ml-3 text-sm text-red-200 max-w-xs truncate font-medium">
          {state.error}
        </div>
      )}
    </div>
  );
};