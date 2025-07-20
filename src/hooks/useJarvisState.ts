import { useState, useCallback } from 'react';
import { JarvisState, ChatMessage } from '../types';

export const useJarvisState = () => {
  const [state, setState] = useState<JarvisState>({
    isWakeActive: false,
    isListening: false,
    isProcessing: false,
    isSpeaking: false,
    transcribedText: '',
    aiResponseText: '',
    searchResult: null,
    error: null,
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const updateState = useCallback((updates: Partial<JarvisState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const addMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const resetState = useCallback(() => {
    setState(prev => ({
      ...prev,
      isListening: false,
      isProcessing: false,
      isSpeaking: false,
      transcribedText: '',
      aiResponseText: '',
      searchResult: null,
      error: null,
    }));
  }, []);

  return {
    state,
    messages,
    updateState,
    addMessage,
    resetState,
  };
};