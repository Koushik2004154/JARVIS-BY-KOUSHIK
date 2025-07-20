import axios from 'axios';
import { VoiceConfig } from '../types';

const VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Adam voice - clear male voice

const voiceConfig: VoiceConfig = {
  voiceId: VOICE_ID,
  stability: 0.75,
  similarityBoost: 0.75,
};

export const synthesizeSpeech = async (text: string): Promise<string> => {
  try {
    console.log('🔊 Synthesizing speech for:', text);
    console.log('🔊 Using ElevenLabs API key:', import.meta.env.VITE_ELEVENLABS_API_KEY ? 'Present' : 'Missing');
    
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceConfig.voiceId}`,
      {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: voiceConfig.stability,
          similarity_boost: voiceConfig.similarityBoost,
        },
      },
      {
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    console.log('🔊 Audio response received, size:', response.data.byteLength);
    
    const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('🚨 ElevenLabs API error:', error);
    if (axios.isAxiosError(error)) {
      console.error('🚨 Response status:', error.response?.status);
      console.error('🚨 Response data:', error.response?.data);
      if (error.response?.status === 401) {
        throw new Error('Invalid ElevenLabs API key - please check your .env file');
      }
      if (error.response?.status === 429) {
        throw new Error('ElevenLabs API rate limit exceeded - please try again later');
      }
      if (error.response?.status >= 500) {
        throw new Error('ElevenLabs service temporarily unavailable');
      }
    }
    throw new Error(`Failed to synthesize speech: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const playAudio = async (audioUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log('🔊 Playing audio from URL:', audioUrl);
    
    const audio = new Audio(audioUrl);
    audio.preload = 'auto';
    audio.volume = 1.0;
    
    audio.onended = () => {
      console.log('🔊 Audio playback ended');
      URL.revokeObjectURL(audioUrl);
      resolve();
    };
    
    audio.onerror = () => {
      console.error('🚨 Audio playback error');
      URL.revokeObjectURL(audioUrl);
      reject(new Error('Audio playback failed'));
    };
    
    audio.oncanplaythrough = () => {
      console.log('🔊 Audio can play through');
    };
    
    audio.onloadstart = () => {
      console.log('🔊 Audio load started');
    };
    
    audio.play()
      .then(() => console.log('🔊 Audio play started'))
      .catch((error) => {
        console.error('🚨 Audio play failed:', error);
        reject(error);
      });
  });
};