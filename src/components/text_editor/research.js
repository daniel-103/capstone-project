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