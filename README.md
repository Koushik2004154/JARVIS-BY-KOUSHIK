# 🤖 JARVIS MVP (Web)

A voice-activated AI assistant inspired by Tony Stark's JARVIS, built with React and cutting-edge AI APIs.

## ✨ Features

- **Wake Word Detection**: Activates when you say "Jarvis"
- **Voice Recognition**: Natural speech-to-text using Web Speech API
- **AI Chat**: Powered by OpenAI's GPT-4 Mini for intelligent responses
- **Voice Synthesis**: High-quality speech output via ElevenLabs
- **Real-time Search**: Web search integration with Serper API
- **Sci-Fi UI**: Futuristic interface with smooth animations

## 🛠️ Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   Copy `.env.example` to `.env` and add your API keys:
   ```bash
   cp .env.example .env
   ```

3. **Get API Keys:**
   - **OpenAI**: [Get API key](https://platform.openai.com/api-keys)
   - **ElevenLabs**: [Get API key](https://elevenlabs.io/app/speech-synthesis)
   - **Serper**: [Get API key](https://serper.dev/)
   - **Picovoice**: [Get access key](https://console.picovoice.ai/)

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 🎯 Usage

1. Open the application in your browser
2. Click the power button to activate JARVIS
3. Say "Jarvis" to wake the assistant
4. Speak your question or command
5. JARVIS will respond with voice and text

## 🔧 Configuration

The application supports the following environment variables:

- `VITE_OPENAI_API_KEY` - OpenAI API key for GPT-4 Mini
- `VITE_ELEVENLABS_API_KEY` - ElevenLabs API key for voice synthesis
- `VITE_SEARCH_API_KEY` - Serper API key for web search
- `VITE_PICOVOICE_ACCESS_KEY` - Picovoice access key for wake word detection

## 🚀 Deployment

Build for production:
```bash
npm run build
```

The application is optimized for deployment on modern hosting platforms like Vercel, Netlify, or any static hosting service.

## 🎨 Tech Stack

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Voice Input**: Web Speech API
- **Voice Output**: ElevenLabs API
- **AI Chat**: OpenAI GPT-4 Mini
- **Search**: Serper API
- **Wake Word**: Picovoice Porcupine (simplified implementation)

## 📝 Notes

- Requires HTTPS in production for microphone access
- Wake word detection uses a simplified implementation (full Porcupine integration would require additional setup)
- Voice recognition requires a modern browser with Web Speech API support
- Best performance on Chrome/Chromium-based browsers

## 🔒 Security

All API keys are handled client-side for this MVP. For production use, consider implementing a backend service to proxy API calls and secure sensitive keys.