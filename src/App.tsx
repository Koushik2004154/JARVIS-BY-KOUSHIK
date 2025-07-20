import React, { useEffect, useState } from 'react';
import { JarvisCore } from './components/JarvisCore';
import { ChatBox } from './components/ChatBox';
import { VoiceInput } from './components/VoiceInput';
import { WakeWordListener } from './components/WakeWordListener';
import { StatusIndicator } from './components/StatusIndicator';
import { IronManFace } from './components/IronManFace';
import { Power, Settings } from 'lucide-react';

function App() {
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Check for required environment variables
  const hasRequiredKeys = Boolean(
    import.meta.env.VITE_OPENAI_API_KEY &&
    import.meta.env.VITE_ELEVENLABS_API_KEY &&
    import.meta.env.VITE_SEARCH_API_KEY
  );

  useEffect(() => {
    // Auto-activate if all keys are present
    if (hasRequiredKeys) {
      setIsActive(true);
    }
  }, [hasRequiredKeys]);

  if (!hasRequiredKeys) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/20 to-cyan-900/30 flex items-center justify-center p-6" style={{
        backgroundImage: 'url(https://i.postimg.cc/t4qWv5bP/jarvis.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}>
        <div className="max-w-md w-full bg-black/40 backdrop-blur-sm rounded-2xl border border-red-500/30 p-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Settings className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-red-300 mb-4">Configuration Required</h1>
          <p className="text-red-200 mb-6 text-sm leading-relaxed">
            Please set up your environment variables in a <code className="bg-red-900/30 px-2 py-1 rounded">.env</code> file:
          </p>
          <p className="text-red-200/80 mb-4 text-xs">
            Copy <code className="bg-red-900/30 px-1 py-0.5 rounded">.env.example</code> to <code className="bg-red-900/30 px-1 py-0.5 rounded">.env</code> and add your API keys
          </p>
          <div className="text-left text-xs text-red-300 bg-red-900/20 p-4 rounded-lg space-y-2">
            <div>VITE_OPENAI_API_KEY=your_key_here</div>
            <div>VITE_ELEVENLABS_API_KEY=your_key_here</div>
            <div>VITE_SEARCH_API_KEY=your_key_here</div>
            <div>VITE_PICOVOICE_ACCESS_KEY=your_key_here</div>
          </div>
          <p className="text-red-200/70 mt-4 text-xs">
            After updating .env, restart the dev server with <code className="bg-red-900/30 px-1 py-0.5 rounded">npm run dev</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden relative" style={{
      backgroundImage: 'url(https://i.postimg.cc/t4qWv5bP/jarvis.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Holographic grid overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
      <JarvisCore>
        {({ state, messages, onWakeWord, onTranscript, onError }) => (
          <div className="relative z-10 min-h-screen flex flex-col p-6">
            {/* Header */}
            <header className="text-center mb-8">
              <div className="inline-flex items-center space-x-4 bg-black/40 backdrop-blur-md rounded-3xl border border-cyan-400/50 px-8 py-6 shadow-2xl shadow-cyan-500/20">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
                    JARVIS
                  </h1>
                  <p className="text-cyan-200/80 text-sm font-medium">AI Assistant Interface</p>
                </div>
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`p-4 rounded-full transition-all duration-300 shadow-lg ${
                    isActive 
                      ? 'bg-green-500/30 border border-green-400/70 text-green-300 shadow-green-500/30' 
                      : 'bg-gray-800/30 border border-gray-600/50 text-gray-300 shadow-gray-500/20'
                  }`}
                >
                  <Power className="w-6 h-6" />
                </button>
              </div>
            </header>

            {/* 3D Iron Man Face */}
            <div className="flex justify-center mb-8">
              <IronManFace
                isActive={isActive}
                isListening={state.isListening}
                isProcessing={state.isProcessing}
                isSpeaking={state.isSpeaking}
              />
            </div>

            {/* Main content */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left sidebar - Controls */}
              <div className="space-y-6">
                <WakeWordListener
                  isActive={isActive}
                  onWakeWord={onWakeWord}
                  onError={onError}
                />
                
                <VoiceInput
                  isListening={state.isListening}
                  onTranscript={onTranscript}
                  onError={onError}
                />
                
                {/* Manual Test Button */}
                <button
                  onClick={() => onTranscript("Hello Jarvis, how are you?")}
                  className="w-full p-4 bg-cyan-500/30 border border-cyan-400/70 rounded-xl text-cyan-200 hover:bg-cyan-500/40 transition-all duration-300 shadow-lg shadow-cyan-500/20 backdrop-blur-sm"
                >
                  🧪 Test Voice Response
                </button>
                
                <StatusIndicator state={state} />

                {/* Quick stats */}
                <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-cyan-400/50 p-6 shadow-xl shadow-cyan-500/10">
                  <h3 className="text-cyan-200 font-semibold mb-4 text-lg">Session Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Messages:</span>
                      <span className="text-cyan-200 font-medium">{messages.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Status:</span>
                      <span className={`font-medium ${isActive ? 'text-green-300' : 'text-gray-300'}`}>
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Voice Ready:</span>
                      <span className="text-cyan-200 font-medium">
                        {typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition) ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center - Chat */}
              <div className="lg:col-span-2 flex flex-col">
                <ChatBox
                  messages={messages}
                  isProcessing={state.isProcessing}
                  isSpeaking={state.isSpeaking}
                />
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center">
              <p className="text-cyan-200/70 text-sm font-medium">
                Say "Jarvis" to activate • Open browser console (F12) for debug info
              </p>
              <p className="text-cyan-200/50 text-xs mt-1">
                Powered by OpenAI, ElevenLabs & Serper
              </p>
              <div className="mt-2 text-xs text-cyan-200/60">
                <p>🎤 Microphone: {typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition) ? 'Supported' : 'Not Supported'}</p>
                <p>🔊 Audio: {typeof window !== 'undefined' && window.Audio ? 'Supported' : 'Not Supported'}</p>
              </div>
            </footer>
          </div>
        )}
      </JarvisCore>
    </div>
  );
}

export default App;