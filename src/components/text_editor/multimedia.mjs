//import { createWorker } from "https://cdn.jsdelivr.net/npm/tesseract.js@4.0.2/+esm";
//import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client/dist/index.min.js";
import { Client, handle_file } from "../../../node_modules/@gradio/client/dist/index.js";
//const Tesseract = require('tesseract.js');

const researchModal = document.getElementById('research-modal');
const researchInput = document.getElementById('research-input');
const editorContainer = document.querySelector('.editor-container');
const closeBtn = document.querySelector('.modal .close');

const WikipediaSearch = document.getElementById('wikipedia-search');
const GoogleSearch = document.getElementById('google-search');
const DictionarySearch = document.getElementById('dictionary-search');

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        editorContainer.classList.toggle('expanded');
        researchModal.classList.toggle('expanded');
        researchModal.style.display = 'none';
    });
}

if (window) {
    window.addEventListener('click', (event) => {
        if (event.target === researchModal) {
            researchModal.style.display = 'none';
        }
    });
}

if (WikipediaSearch) {
    WikipediaSearch.addEventListener('click', () => {
        const query = researchInput.value;
        window.open(`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`, '_blank');
    });
}

if (GoogleSearch) {
    GoogleSearch.addEventListener('click', () => {
        const query = researchInput.value;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    });
}

if (DictionarySearch) {
    DictionarySearch.addEventListener('click', () => {
        const query = researchInput.value;
        window.open(`https://www.dictionary.com/browse/${encodeURIComponent(query)}`, '_blank');
    });
}

function base64ToBlob(base64, mime) {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mime });
}

export async function extractTextFromImage(imageData) {
    try {
        const client = await Client.connect("prithivMLmods/Qwen2.5-VL-7B-Instruct");

        // Convert base64 imageData to Blob if necessary
        let file;
        if (typeof imageData === 'string' && imageData.startsWith('data:')) {
            const mime = imageData.split(',')[0].split(':')[1].split(';')[0];
            file = base64ToBlob(imageData, mime);
        } else {
            file = imageData;
        }

        console.log("file: ", file);

        // Send the image to the model using handle_file
        const result = await client.predict("/chat", { 
            message: {
                text: "What does this say", 
                files: [handle_file(file)]  // Pass the file to handle_file
            }
        });

        const text = result.data[0];
        console.log("text: ", text);
        return text;
    } catch (error) {
        console.error("Error:", error.message);
    }
}

export async function textToSpeech(quillContent) {
    try {
        const client = await Client.connect("k2-fsa/text-to-speech");

        const result = await client.predict("/process", { 		
            language: "English", 		
            repo_id: "csukuangfj/kokoro-en-v0_19|11 speakers", 		
            text: quillContent, 		
            sid: "0", 		
            speed: 1, 
        });

        const audioUrl = result.data[0].url;
        console.log("audioUrl: ", audioUrl);
        return audioUrl;
    } catch (error) {
        console.error("Error:", error.message);
    }
}
