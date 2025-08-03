import React, { useCallback } from 'react';
import { getChatResponse } from '../api/openai';
import { searchWeb, shouldSearch } from '../api/search';
import { synthesizeSpeech, playAudio } from '../api/elevenlabs';
import { useJarvisState } from '../hooks/useJarvisState';

interface JarvisCoreProps {
  children: (props: {
    state: any;
    messages: any[];
    onWakeWord: () => void;
    onTranscript: (text: string) => void;
    onError: (error: string) => void;
  }) => React.ReactNode;
}

export const JarvisCore: React.FC<JarvisCoreProps> = ({ children }) => {
  const { state, messages, updateState, addMessage, resetState } = useJarvisState();

  const onWakeWord = useCallback(() => {
    console.log('🎯 Wake word detected!');
    updateState({ 
      isWakeActive: true, 
      isListening: true,
      error: null 
    });
  }, [updateState]);

  const onTranscript = useCallback(async (text: string) => {
    console.log('📝 Transcript received:', text);
    
    updateState({ 
      transcribedText: text, 
      isListening: false, 
      isProcessing: true 
    });

    addMessage({ type: 'user', text, isVoice: true });

    try {
      let searchContext = '';
      
      // Check if we need to search for current information
      if (shouldSearch(text)) {
        console.log('🔍 Searching for:', text);
        try {
          searchContext = await searchWeb(text);
          updateState({ searchResult: searchContext });
        } catch (searchError) {
          console.warn('⚠️ Search failed, continuing without search context:', searchError);
        }
      }

      // Get AI response
      console.log('🤖 Getting AI response...');
      const aiResponse = await getChatResponse(text, searchContext);
      
      updateState({ 
        aiResponseText: aiResponse, 
        isProcessing: false, 
        isSpeaking: true 
      });

      addMessage({ type: 'assistant', text: aiResponse, isVoice: true });

      // Synthesize and play speech
      console.log('🔊 Synthesizing speech...');
      try {
        const audioUrl = await synthesizeSpeech(aiResponse);
        console.log('🔊 Playing synthesized speech...');
        await playAudio(audioUrl);
        console.log('✅ Speech playback completed');
      } catch (speechError) {
        console.warn('⚠️ Speech synthesis/playback failed:', speechError);
        // Continue without speech but show the text response
        addMessage({ 
          type: 'assistant', 
          text: '⚠️ Voice synthesis unavailable - check ElevenLabs API key', 
          isVoice: false 
        });
      }
      
      updateState({ isSpeaking: false });
      
      // Reset to listening state after a brief pause
      setTimeout(() => {
        updateState({ isListening: true });
      }, 1000);

    } catch (error) {
      console.error('🚨 Error processing request:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      updateState({ 
        error: errorMessage, 
        isProcessing: false, 
        isSpeaking: false 
      });
      
      // Auto-clear error and return to listening after 3 seconds
      setTimeout(() => {
        updateState({ error: null, isListening: true });
      }, 3000);
    }
  }, [updateState, addMessage]);

  const onError = useCallback((error: string) => {
    console.error('🚨 JARVIS error:', error);
    updateState({ error, isListening: false, isProcessing: false });
    
    // Auto-clear error and return to standby after 3 seconds
    setTimeout(() => {
      updateState({ error: null });
    }, 3000);
  }, [updateState]);

  return (
    <>
      {children({
        state,
        messages,
        onWakeWord,
        onTranscript,
        onError,
      })}
    </>
  );
};