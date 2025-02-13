import { quill } from './text_editor.js';

// Undo
window.top.document.getElementById('edit-undo-btn').addEventListener('click', () => quill.history.undo());

// Redo
window.top.document.getElementById('edit-redo-btn').addEventListener('click', () => quill.history.redo());