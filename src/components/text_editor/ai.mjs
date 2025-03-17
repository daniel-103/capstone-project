import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";
import { quill } from './text_editor.js';

// Get elements
const aiInput = document.getElementById("ai-input");
const aiSubmit = document.getElementById("ai-submit");
const aiResponse = document.getElementById("ai-response");
const aiAssistantButton = document.getElementById("ai-assistant-button");
const aiAssistantModal = document.getElementById("ai-assistant-modal");
const closeAiAssistant = document.getElementById("close-ai-assistant");

// Function to send request to AI model
const run = async () => {
    try {
        aiResponse.innerHTML = "⏳ Thinking..."; // Show loading state

        const client = await Client.connect("yuntian-deng/ChatGPT");

        const quillContent = quill.getText().trim();

        const prompt = `
        You are an AI assistant designed to help a user write a creative writing piece. 
        Here is what they wrote: ${quillContent}. 
        Here is their question for you: ${aiInput.value.trim()}
        `;
        // Set a timeout to reject the request if it takes too long
        const result = await Promise.race([
            client.predict("/predict", { 
                inputs: prompt,
                top_p: 0, 		
                temperature: 0
            }),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timeout")), 10000) // 10s timeout
            )
        ]);

        // Extract and display AI response
        const aiReply = result.data[0][0][1] || "⚠️ No response received.";
        aiResponse.innerHTML = aiReply;
    } catch (error) {
        console.error("AI Assistant Error:", error);
        aiResponse.innerHTML = "⚠️ Error fetching AI response!";
    }
};

// Attach event listener to the submit button
aiSubmit.addEventListener("click", run);

// Attach event listener to the submit button
aiSubmit.addEventListener("click", run);

// Open AI Assistant Modal
aiAssistantButton.addEventListener("click", () => {
    aiAssistantModal.style.display = "block";
});

// Close AI Assistant Modal
closeAiAssistant.addEventListener("click", () => {
    aiAssistantModal.style.display = "none";
});

// Close AI Assistant Modal when clicking outside of it
window.addEventListener("click", (event) => {
    if (event.target === aiAssistantModal) {
        aiAssistantModal.style.display = "none";
    }
});