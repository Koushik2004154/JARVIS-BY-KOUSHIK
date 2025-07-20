export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isVoice?: boolean;
}

export interface JarvisState {
  isWakeActive: boolean;
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  transcribedText: string;
  aiResponseText: string;
  searchResult: string | null;
  error: string | null;
}

export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

export interface VoiceConfig {
  voiceId: string;
  stability: number;
  similarityBoost: number;
}