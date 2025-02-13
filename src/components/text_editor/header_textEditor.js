import { quill } from './text_editor.js';

// Undo
window.top.document.getElementById('edit-undo-btn').addEventListener('click', () => quill.history.undo());

// Redo
window.top.document.getElementById('edit-redo-btn').addEventListener('click', () => quill.history.redo());

// Cut
window.top.document.getElementById('edit-cut-btn').addEventListener('click', () => {
    document.execCommand('cut');
});

// Copy
window.top.document.getElementById('edit-copy-btn').addEventListener('click', () => {
    document.execCommand('copy');
});

// Paste
window.top.document.getElementById('edit-paste-btn').addEventListener('click', () => {
    document.execCommand('paste');
});

