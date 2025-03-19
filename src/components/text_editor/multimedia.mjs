import { Client } from "../../../node_modules/@gradio/client/dist/index.js";

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
