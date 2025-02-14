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

// Find & Replace
const findBtn = window.top.document.getElementById("edit-find-btn");
const replaceBtn = window.top.document.getElementById("edit-replace-btn");
const modal = window.top.document.getElementById("search-modal");
const closeModal = window.top.document.querySelector(".close-modal");

const modalTitle = window.top.document.getElementById("modal-title");
const searchInput = window.top.document.getElementById("search-input");
const replaceSection = window.top.document.getElementById("replace-section");
const replaceInput = window.top.document.getElementById("replace-input");

const findNextBtn = window.top.document.getElementById("find-next-btn");
const findPrevBtn = window.top.document.getElementById("find-prev-btn");
const replaceOneBtn = window.top.document.getElementById("replace-btn");
const replaceAllBtn = window.top.document.getElementById("replace-all-btn");

// Notification modal elements
const notificationModal = window.top.document.getElementById("notification-modal");
const notificationMessage = window.top.document.getElementById("notification-message");
const closeNotification = window.top.document.getElementById("close-notification");

let lastSearchIndex = -1;

// Function to show notification modal
function showNotification(message) {
    notificationMessage.textContent = message;
    notificationModal.style.display = "block";
}

// Close notification modal
closeNotification.addEventListener("click", () => {
    notificationModal.style.display = "none";
    quill.focus(); // Refocus editor
});

// Function to open the modal
function openModal(mode) {
    modal.style.display = "block";
    searchInput.value = "";
    replaceInput.value = "";
    lastSearchIndex = -1;

    if (mode === "find") {
        modalTitle.textContent = "Find";
        replaceSection.style.display = "none";
        replaceOneBtn.style.display = "none";
        replaceAllBtn.style.display = "none";
    } else if (mode === "replace") {
        modalTitle.textContent = "Find & Replace";
        replaceSection.style.display = "block";
        replaceOneBtn.style.display = "inline-block";
        replaceAllBtn.style.display = "inline-block";
    }

    searchInput.focus();
}

// Open modal for "Find"
findBtn.addEventListener("click", () => openModal("find"));

// Open modal for "Replace"
replaceBtn.addEventListener("click", () => openModal("replace"));

// Close modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Function to search text
function findText(next = true) {
    const searchQuery = searchInput.value.trim();
    if (!searchQuery) return;

    const editorContent = quill.getText();
    let index;

    if (next) {
        index = editorContent.indexOf(searchQuery, lastSearchIndex + 1);
    } else {
        index = editorContent.lastIndexOf(searchQuery, lastSearchIndex - 1);
    }

    if (index !== -1) {
        quill.setSelection(index, searchQuery.length);
        lastSearchIndex = index;
    } else {
        showNotification("No more matches found.");
        quill.focus();
        return;
    }
}

// Function to replace text
function replaceText(all = false) {
    const searchQuery = searchInput.value.trim();
    const replaceQuery = replaceInput.value.trim();
    if (!searchQuery) return;

    const editorContent = quill.getText();

    if (all) {
        const newText = editorContent.replace(new RegExp(searchQuery, "g"), replaceQuery);
        quill.setText(newText);
    } else {
        if (lastSearchIndex !== -1) {
            quill.deleteText(lastSearchIndex, searchQuery.length);
            quill.insertText(lastSearchIndex, replaceQuery);
        } else {
            showNotification("No matches found.");
            quill.focus();
            return;
        }
    }
}

// Event Listeners
findNextBtn.addEventListener("click", () => findText(true));
findPrevBtn.addEventListener("click", () => findText(false));
replaceOneBtn.addEventListener("click", () => replaceText(false));
replaceAllBtn.addEventListener("click", () => replaceText(true));
