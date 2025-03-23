import { Client } from "../../../node_modules/@gradio/client/dist/index.js";

const researchModal = document.getElementById("research-modal");
const researchModalheader = document.getElementById("research-modalheader");
const closeResearchModal = document.getElementById("close-research-modal");
const researchInput = document.getElementById('research-input');

const audioModal = document.getElementById('audio-player-modal');
const audioModalheader = document.getElementById('audio-player-modalheader');
const closeAudioModal = document.getElementById("audio-player-modal-close-audio-player");
const audioResponse = document.getElementById("audio-response");

const WikipediaSearch = document.getElementById('wikipedia-search');
const GoogleSearch = document.getElementById('google-search');
const DictionarySearch = document.getElementById('dictionary-search');

// Make the Research Modal draggable
let isDraggingResearch = false;
let isResizingResearch = false;
let offsetXResearch, offsetYResearch;

function makeResearchModalDraggableAndResizable(modal, header) {
    if (modal && header) {
        header.addEventListener('mousedown', function(e) {
            isDraggingResearch = true;
            offsetXResearch = e.clientX - modal.getBoundingClientRect().left;
            offsetYResearch = e.clientY - modal.getBoundingClientRect().top;
            document.body.style.cursor = 'move';
        });

        document.addEventListener('mousemove', function(e) {
            if (isDraggingResearch) {
                modal.style.left = `${e.clientX - offsetXResearch}px`;
                modal.style.top = `${e.clientY - offsetYResearch}px`;
            }
        });

        document.addEventListener('mouseup', function() {
            if (isDraggingResearch) {
                isDraggingResearch = false;
                document.body.style.cursor = 'default';
            }
        });

        modal.addEventListener('mousedown', function(e) {
            if (e.target === modal && !isDraggingResearch) {
                isResizingResearch = true;
                document.body.style.cursor = 'nwse-resize';
            }
        });

        document.addEventListener('mousemove', function(e) {
            if (isResizingResearch) {
                const rect = modal.getBoundingClientRect();
                modal.style.width = `${e.clientX - rect.left}px`;
                modal.style.height = `${e.clientY - rect.top}px`;
            }
        });

        document.addEventListener('mouseup', function() {
            if (isResizingResearch) {
                isResizingResearch = false;
                document.body.style.cursor = 'default';
            }
        });
    }
}

makeResearchModalDraggableAndResizable(researchModal, researchModalheader);

// Make the Audio Player Modal draggable
let isDraggingAudio = false;
let isResizingAudio = false;
let offsetXAudio, offsetYAudio;

function makeAudioModalDraggableAndResizable(modal, header) {
    if (modal && header) {
        header.addEventListener('mousedown', function(e) {
            isDraggingAudio = true;
            offsetXAudio = e.clientX - modal.getBoundingClientRect().left;
            offsetYAudio = e.clientY - modal.getBoundingClientRect().top;
            document.body.style.cursor = 'move';
        });

        document.addEventListener('mousemove', function(e) {
            if (isDraggingAudio) {
                modal.style.left = `${e.clientX - offsetXAudio}px`;
                modal.style.top = `${e.clientY - offsetYAudio}px`;
            }
        });

        document.addEventListener('mouseup', function() {
            if (isDraggingAudio) {
                isDraggingAudio = false;
                document.body.style.cursor = 'default';
            }
        });

        modal.addEventListener('mousedown', function(e) {
            if (e.target === modal && !isDraggingAudio) {
                isResizingAudio = true;
                document.body.style.cursor = 'nwse-resize';
            }
        });

        document.addEventListener('mousemove', function(e) {
            if (isResizingAudio) {
                const rect = modal.getBoundingClientRect();
                modal.style.width = `${e.clientX - rect.left}px`;
                modal.style.height = `${e.clientY - rect.top}px`;
            }
        });

        document.addEventListener('mouseup', function() {
            if (isResizingAudio) {
                isResizingAudio = false;
                document.body.style.cursor = 'default';
            }
        });
    }
}

makeAudioModalDraggableAndResizable(audioModal, audioModalheader);

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

// Close Research Modal
if (closeResearchModal) {
    closeResearchModal.addEventListener("click", () => {
        researchModal.style.display = "none";
    });
}

// Close Audio Modal
if (closeAudioModal) {
    closeAudioModal.addEventListener("click", () => {
        audioModal.style.display = "none";
    });
}

export async function textToSpeech(quillContent) {
    try {
        audioResponse.innerHTML = "⏳ Loading..."; 
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
        audioResponse.innerHTML = ""; 
        return audioUrl;
    } catch (error) {
        console.error("Error:", error.message);
    }
}