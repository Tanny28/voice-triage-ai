# 🩺 VoiceTriage AI

> Real-time, AI-powered voice health triage using OpenAI Whisper + GPT-4 + OmniDimension

**VoiceTriage AI** is an intelligent web application that lets users speak their symptoms and receive instant, privacy-respecting health advice using state-of-the-art voice-to-AI technology.

Built for **Vibe-a-thon 2.0**, this project blends cutting-edge voice interfaces, browser-friendly UX, and medical-grade AI suggestions — no typing required.

---

## 🎯 Features

- 🎙️ Start/Stop Voice Listening with animation & accessibility
- 🔊 Audio transcribed using **OpenAI Whisper**
- 🧠 Transcripts analyzed via **GPT-4** or OmniDimension AI
- 🗣️ Responses delivered instantly in the UI
- 📞 Optional “Emergency AI Call” trigger via **Supabase Edge Function**
- 🧩 OmniDimension Web Widget integration for live voice chats
- 🛡️ Fully private – no health data stored permanently
- 🌐 Built with **React + Vite + TailwindCSS + Supabase**

---

## 🧪 Live Demo

[🔗 Try it now (Lovable Hosted)](https://preview--voice-ai-triage-flow.lovable.app/)

---

## 🖼️ Screenshots

![VoiceTriage AI](https://your-screenshot-url-if-any.png)

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| UI & Animations | React, TailwindCSS, Vite |
| Voice UI | MediaRecorder, OmniDimension Widget |
| Transcription | OpenAI Whisper API |
| AI Reasoning | GPT-4 / OmniDimension AI |
| Backend | Next.js API / Supabase Edge Functions |
| Deployment | Lovable.app / GitHub Pages / Vercel |

---

## 🧩 OmniDimension Integration

We use:
- Omni’s Web Widget (`web_widget.js`) for instant in-browser voice interactions
- Agent ID: `2585` (custom trained)
- Omni Call API (configured for production rollout post-hackathon)

📌 Note: **Actual AI calls require a purchased Omni phone number ($2/mo)**. In demo mode, AI triage call is simulated.

---

## 📁 Project Structure

```bash
📦 voice-triage-ai
├── public/                    # Static assets
├── src/
│   ├── components/            # UI elements
│   ├── pages/                 # Main route pages
│   ├── api/voice.ts           # Audio to Whisper + GPT backend
│   ├── integrations/          # Supabase config
│   └── App.tsx                # Routing and providers
├── supabase/
│   └── functions/dispatch-call.ts # Optional call trigger
├── .env                       # API keys (not committed)
└── README.md
```

# Clone the repo
git clone https://github.com/Tanny28/voice-triage-ai.git
cd voice-triage-ai

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add required keys
# VITE_OMNIDIM_AGENT_ID=2585
# OPENAI_API_KEY=sk-...
# OMNIDIM_API_KEY=...
# TEST_PHONE_NUMBER=+91XXXXXXXXXX

# Start dev server
npm run dev
OPENAI_API_KEY=your-openai-key
OMNIDIM_API_KEY=your-omni-key
VITE_OMNIDIM_AGENT_ID=2585
TEST_PHONE_NUMBER=+91xxxxxxxxxx

Built During
🎧 VIBE-A-THON 2.0
Powered by Geek Room × OmniDimension
June 2025 | Theme: "Build with Voice AI"

