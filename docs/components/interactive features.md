# 📜 Interactive Features Overview
This document provides an overview of the **AI Assistant**, **Research Tools**, and **Text-to-Speech** functionalities within the application.

---

## 🤖 AI Assistant SkripMancer
The AI Assistant helps users generate responses, brainstorm ideas, and assist with writing.

### 🔹 How It Works
1. User enters a query into the AI Assistant input box.
2. The query is sent to an AI model for processing.
3. The AI returns a response, which is displayed in the modal.

### ⚙️ Implementation
- The AI Assistant is integrated using the `@gradio/client` API.
- It is triggered from the Quill toolbar button (`AI Assistant`).
- The response is fetched asynchronously and displayed in the modal.

### 💡 Usage
- Open the AI Assistant from the toolbar.
- Enter a prompt (e.g., `"Summarize this paragraph."`) in the text box.
- Click **Ask SkripMancer**, and the response will appear below.

---

## 🔍 Research Tools
The Research Tools allow users to quickly search **Google, Wikipedia, and Dictionary** directly from the application.

### 🔹 How It Works
1. User enters a topic in the Research modal.
2. The system queries external sources (e.g., Wikipedia API, Google Search).
3. Results are displayed in the modal.

### ⚙️ Implementation
- API requests fetch data from sources like **Wikipedia** and **Google**.
- It is triggered from the Quill toolbar button (`Research Button`).
- The results are formatted and displayed.

### 💡 Usage
- Open the Research modal from the toolbar.
- Enter a search term (e.g., `"History of Gorillas"`).
- Click **Search** to view results inside the modal.

---

## 🔊 Text-to-Speech (TTS)
The **Text-to-Speech (TTS)** feature converts text into spoken audio.

### 🔹 How It Works
1. The system generates audio from the text.
2. The audio is played and displayed in an embedded audio player.

### ⚙️ Implementation
- It is triggered from the Quill toolbar button (`Text-to-Speech`).
- Uses `@gradio/client` to connect to a TTS model.
- Converts text into `.wav` or `.mp3` format.
- Displays the modal with an audio player in the UI.

### 💡 Usage
- Open the Text-to-Speech modal from the toolbar.
- It will automatically start loading the audio.
- Once loaded, click the play button in the audio player to hear the text-to-speech.

---

