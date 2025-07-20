import React, { useEffect, useRef, useState } from 'react';
import { Power, PowerOff } from 'lucide-react';

interface WakeWordListenerProps {
  isActive: boolean;
  onWakeWord: () => void;
  onError: (error: string) => void;
}

export const WakeWordListener: React.FC<WakeWordListenerProps> = ({
  isActive,
  onWakeWord,
  onError,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [status, setStatus] = useState<'inactive' | 'initializing' | 'listening' | 'error'>('inactive');
  const porcupineRef = useRef<any>(null);

  useEffect(() => {
    const initializePorcupine = async () => {
      try {
        setStatus('initializing');
        
        // TODO: Implement proper Picovoice Porcupine integration
        // For now, this acts as a visual placeholder
        setStatus('listening');
        setIsInitialized(true);
      } catch (error) {
        console.error('Wake word initialization failed:', error);
        setStatus('error');
        onError('Failed to initialize wake word detection');
      }
    };

    if (isActive && !isInitialized) {
      initializePorcupine();
    } else if (!isActive && porcupineRef.current) {
      // No cleanup needed for placeholder implementation
      setStatus('inactive');
    }

    return () => {
      // No cleanup needed for placeholder implementation
    };
  }, [isActive, isInitialized, onWakeWord, onError]);

  const getStatusIcon = () => {
    switch (status) {
      case 'listening':
        return <Power className="w-5 h-5 text-green-400" />;
      case 'initializing':
        return <Power className="w-5 h-5 text-yellow-400 animate-spin" />;
      case 'error':
        return <PowerOff className="w-5 h-5 text-red-400" />;
      default:
        return <PowerOff className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'listening':
        return 'Listening for "Jarvis"';
      case 'initializing':
        return 'Initializing...';
      case 'error':
        return 'Wake word error';
      default:
        return 'Wake word inactive';
    }
  };

  return (
    <div className={`flex items-center justify-center p-4 rounded-xl transition-all duration-300 backdrop-blur-md shadow-lg ${
      status === 'listening' 
        ? 'bg-green-500/30 border border-green-400/70 shadow-green-500/30' 
        : status === 'error'
        ? 'bg-red-500/30 border border-red-400/70 shadow-red-500/30'
        : 'bg-gray-800/30 border border-gray-600/50 shadow-gray-500/20'
    }`}>
      {getStatusIcon()}
      <span className={`ml-2 text-sm transition-colors font-medium ${
        status === 'listening' 
          ? 'text-green-200' 
          : status === 'error'
          ? 'text-red-200'
          : 'text-gray-300'
      }`}>
        {getStatusText()}
      </span>
    </div>
  );
};