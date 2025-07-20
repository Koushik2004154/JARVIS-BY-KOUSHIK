import React, { useEffect, useRef } from 'react';
import { Bot, User, Volume2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatBoxProps {
  messages: ChatMessage[];
  isProcessing: boolean;
  isSpeaking: boolean;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  isProcessing,
  isSpeaking,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 bg-black/40 backdrop-blur-md rounded-3xl border border-cyan-400/50 p-6 overflow-hidden shadow-2xl shadow-cyan-500/20">
      <div className="h-full flex flex-col">
        <div className="flex items-center mb-4 pb-4 border-b border-cyan-500/20">
          <Bot className="w-7 h-7 text-cyan-300 mr-3 drop-shadow-lg" />
          <h2 className="text-xl font-semibold text-cyan-200 drop-shadow-lg">JARVIS Chat</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-400/40">
          {messages.length === 0 && (
            <div className="text-center text-gray-300 py-8">
              <Bot className="w-16 h-16 mx-auto mb-4 text-cyan-400/70 drop-shadow-lg animate-pulse" />
              <p className="text-lg font-medium">Say "Jarvis" to activate voice assistant</p>
              <p className="text-sm mt-2 text-cyan-200/70">I'm ready to help you with anything</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-cyan-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30 border border-cyan-400/50">
                  <Bot className="w-5 h-5 text-cyan-200" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-md border shadow-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500/30 border-blue-400/50 text-blue-100 shadow-blue-500/20'
                    : 'bg-cyan-500/20 border-cyan-400/40 text-cyan-100 shadow-cyan-500/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs opacity-80 font-medium">
                    {message.type === 'user' ? 'You' : 'JARVIS'}
                  </span>
                  {message.isVoice && (
                    <Volume2 className="w-3 h-3 opacity-80" />
                  )}
                </div>
                <p className="text-sm leading-relaxed font-medium">{message.text}</p>
                <span className="text-xs opacity-60 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              
              {message.type === 'user' && (
                <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 border border-blue-400/50">
                  <User className="w-5 h-5 text-blue-200" />
                </div>
              )}
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-400/50">
                <Bot className="w-5 h-5 text-cyan-200 animate-pulse" />
              </div>
              <div className="bg-cyan-500/20 border border-cyan-400/40 rounded-2xl p-4 backdrop-blur-md shadow-lg shadow-cyan-500/20">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce shadow-sm"></div>
                  <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-cyan-200 mt-2 block font-medium">Thinking...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {isSpeaking && (
          <div className="mt-4 p-3 bg-cyan-500/20 border border-cyan-400/40 rounded-lg backdrop-blur-md shadow-lg shadow-cyan-500/20">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span className="text-sm text-cyan-200 font-medium">JARVIS is speaking...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};