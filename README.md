# 🧠 Vault

**Vault** is a self-hosted React-based frontend for chatting with LLMs, including Google's Gemini API and local LLM endpoints. It serves as a unified interface for interacting with your own [RagTimeAPI](https://github.com/AliBenrami/RagTimeAPI) and other tools — all from your browser.

> 🔐 REST API and frontend are local. Only the LLM (Gemini) may connect to external APIs unless you self-host.

---

## 🚀 Features

- 🌐 Chat UI for communicating with local or remote LLMs
- 🔍 Context-aware Q&A with integrated [RagTimeAPI](https://github.com/AliBenrami/RagTimeAPI)
- 🧠 Gemini API support
- ⚙️ Configurable endpoints via `.env`
- 🧪 Demo version in the works

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js ≥ 18
- A running instance of:
  - [`RagTimeAPI`](https://github.com/AliBenrami/RagTimeAPI)
  - Optionally: Ollama / LM Studio / Local LLM server

### Installation

```bash
git clone https://github.com/AliBenrami/vault.git
cd vault
npm install
npm run dev
```

### Configuration

Create a `.env.local` file:

```env

```

---

## 📡 API Integrations

- **🔗 RagTimeAPI**  
  Self-hosted retrieval-augmented generation (RAG) backend.  
  → [`github.com/AliBenrami/RagTimeAPI`](https://github.com/AliBenrami/RagTimeAPI)

- **🧠 Gemini API**  
  Used for chat, reasoning, and general LLM capabilities. Requires API key.  
  → [gemini.google.com](https://gemini.google.com/)

- **💻 Local LLMs (optional)**  
  Support for calling models like `llama3`, `mistral`, etc. via local APIs

---

## 🧪 Demo (Coming Soon)

A hosted read-only demo of Vault will be made available. Stay tuned!

---

## 📷 Screenshots

> (Add GIFs or images of UI once available)

---

## 🛠️ Roadmap

- ✅ Gemini chat integration
- ✅ RagTimeAPI context injection
- 🔜 File/document upload for RAG
- 🔜 Local LLM support toggle
- 🔜 Agent support
- 🔜 Demo site with example data
- 🔜 User profiles & preferences (optional)

---

## 🤝 Contributing

Not accepting PRs yet — but feel free to fork or create issues.

---

## 📄 License

MIT
