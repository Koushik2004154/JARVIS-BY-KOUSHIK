import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

interface VoiceInputProps {
  isListening: boolean;
  onTranscript: (text: string) => void;
  onError: (error: string) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  isListening,
  onTranscript,
  onError,
}) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'unknown' | 'granted' | 'denied'>('unknown');

  useEffect(() => {
    // Check microphone permission
    navigator.permissions?.query({ name: 'microphone' as PermissionName })
      .then(result => {
        setPermissionStatus(result.state as 'granted' | 'denied');
        console.log('Microphone permission:', result.state);
      })
      .catch(() => {
        console.log('Permission API not supported');
      });

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      console.log('Speech Recognition API available');
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('🎤 Speech recognition result:', transcript);
        onTranscript(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('🚨 Speech recognition error:', event.error);
        onError(`Voice recognition error: ${event.error}`);
      };
      
      recognition.onstart = () => {
        console.log('🎤 Speech recognition started');
      };
      
      recognition.onend = () => {
        console.log('🎤 Speech recognition ended');
      };
      
      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
      console.error('🚨 Speech Recognition API not supported');
      onError('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscript, onError]);

  useEffect(() => {
    if (!recognitionRef.current || !isSupported) return;

    if (isListening) {
      try {
        console.log('🎤 Starting speech recognition...');
        // Check if recognition is already running
        if (recognitionRef.current.state !== 'running') {
          recognitionRef.current.start();
        }
      } catch (error) {
        console.error('🚨 Failed to start recognition:', error);
        onError('Failed to start voice recognition');
      }
    } else {
      console.log('🎤 Stopping speech recognition...');
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log('🎤 Recognition already stopped');
      }
    }
  }, [isListening, isSupported]);

  if (!isSupported) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-900/30 rounded-xl border border-red-500/50 backdrop-blur-md shadow-lg shadow-red-500/20">
        <MicOff className="w-6 h-6 text-red-300 mr-2" />
        <span className="text-red-200 font-medium">Voice input not supported</span>
      </div>
    );
  }

  if (permissionStatus === 'denied') {
    return (
      <div className="flex items-center justify-center p-4 bg-red-900/30 rounded-xl border border-red-500/50 backdrop-blur-md shadow-lg shadow-red-500/20">
        <AlertCircle className="w-6 h-6 text-red-300 mr-2" />
        <span className="text-red-200 font-medium">Microphone access denied</span>
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center p-4 rounded-xl transition-all duration-300 backdrop-blur-md shadow-lg ${
      isListening 
        ? 'bg-blue-500/30 border border-blue-400/70 animate-pulse shadow-blue-500/30' 
        : 'bg-gray-800/30 border border-gray-600/50 shadow-gray-500/20'
    }`}>
      <Mic className={`w-6 h-6 transition-colors ${
        isListening ? 'text-blue-300' : 'text-gray-300'
      }`} />
      <span className={`ml-2 transition-colors font-medium ${
        isListening ? 'text-blue-200' : 'text-gray-300'
      }`}>
        {isListening ? 'Listening...' : 'Voice Ready'}
      </span>
    </div>
  );
};