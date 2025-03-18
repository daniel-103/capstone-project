import { createWorker } from "https://cdn.jsdelivr.net/npm/tesseract.js@4.0.2/+esm";
//const Tesseract = require('tesseract.js');
const researchModal = document.getElementById('research-modal');
const researchInput = document.getElementById('research-input');
const editorContainer = document.querySelector('.editor-container');
const closeBtn = document.querySelector('.modal .close');

closeBtn.addEventListener('click', () => {
    editorContainer.classList.toggle('expanded');
    researchModal.classList.toggle('expanded');
    researchModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === researchModal) {
        researchModal.style.display = 'none';
    }
});

document.getElementById('wikipedia-search').addEventListener('click', () => {
    const query = researchInput.value;
    window.open(`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(query)}`, '_blank');
});

document.getElementById('google-search').addEventListener('click', () => {
    const query = researchInput.value;
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
});

document.getElementById('dictionary-search').addEventListener('click', () => {
    const query = researchInput.value;
    window.open(`https://www.dictionary.com/browse/${encodeURIComponent(query)}`, '_blank');
});

export async function extractTextFromImage(imageData) {
    const worker = await createWorker("eng"); // Load English OCR model
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imageData);
    await worker.terminate(); // Free up memory
    return text.trim() || "⚠️ No text found in image.";

/*
    Tesseract.recognize(imageData)
    .then(function(result) {
        console.log(result.text);
    });
*/
}