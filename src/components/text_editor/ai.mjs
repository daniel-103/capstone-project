import { Client } from "../../../node_modules/@gradio/client/dist/index.js";
import { quill } from './text_editor.js';

// Get elements
const aiInput = document.getElementById("ai-input");
const aiSubmit = document.getElementById("ai-submit");
const aiResponse = document.getElementById("ai-response");
const aiAssistantModal = document.getElementById("ai-assistant-modal");
const aiAssistantModalheader = document.getElementById("ai-assistant-modalheader");
const researchModal = document.getElementById("research-modal");
const researchModalheader = document.getElementById("research-modalheader");
const closeAiAssistant = document.getElementById("close-ai-assistant");
const closeResearchModal = document.getElementById("close-research-modal");
const editorContainer = document.querySelector('.editor-container');

let savedRange = null;

// Save the selection range before the AI input is focused
aiInput.addEventListener("focus", () => {
    savedRange = quill.getSelection();
});

// Restore the selection range after the AI input is blurred
aiInput.addEventListener("blur", () => {
    if (savedRange) {
        quill.setSelection(savedRange);
    }
});

// Function to send request to AI model
const run = async () => {
    try {
        aiResponse.innerHTML = "⏳ Thinking..."; // Show loading state

        const client = await Client.connect("yuntian-deng/ChatGPT");

        const quillContent = quill.getText().trim();

        // Get the highlighted text
        const range = savedRange || quill.getSelection();
        const highlightedText = range ? quill.getText(range.index, range.length).trim() : '';

        const prompt = `
        You are an AI assistant designed to help a user write a creative writing piece. 
        Here is what they wrote: ${quillContent}. 
        Here is the highlighted text: ${highlightedText}.
        Here is their question for you: ${aiInput.value.trim()}
        `;
        console.log(prompt);
        // Set a timeout to reject the request if it takes too long
        const result = await Promise.race([
            client.predict("/predict", { 
                inputs: prompt,
                top_p: 0, 		
                temperature: 0
            })
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

// Close AI Assistant Modal
closeAiAssistant.addEventListener("click", () => {
    aiAssistantModal.style.display = "none";
});

// Close Research Modal
closeResearchModal.addEventListener("click", () => {
    researchModal.style.display = "none";
});

// Make the AI Assistant Modal draggable
let isDragging = false;
let isResizing = false;
let offsetX, offsetY;

function makeModalDraggableAndResizable(modal, header) {
    header.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - modal.getBoundingClientRect().left;
        offsetY = e.clientY - modal.getBoundingClientRect().top;
        document.body.style.cursor = 'move';
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            modal.style.left = `${e.clientX - offsetX}px`;
            modal.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = 'default';
        }
    });

    modal.addEventListener('mousedown', function(e) {
        if (e.target === modal && !isDragging) {
            isResizing = true;
            document.body.style.cursor = 'nwse-resize';
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isResizing) {
            const rect = modal.getBoundingClientRect();
            modal.style.width = `${e.clientX - rect.left}px`;
            modal.style.height = `${e.clientY - rect.top}px`;
        }
    });

    document.addEventListener('mouseup', function() {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = 'default';
        }
    });
}

// Apply draggable and resizable functionality
makeModalDraggableAndResizable(aiAssistantModal, aiAssistantModalheader);
makeModalDraggableAndResizable(researchModal, researchModalheader);