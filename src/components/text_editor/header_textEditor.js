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

// Zoom In & Zoom Out & Reset

// Get buttons
const zoomInBtn = window.top.document.getElementById("view-zoom-in-btn");
const zoomOutBtn = window.top.document.getElementById("view-zoom-out-btn");
const resetZoomBtn = window.top.document.getElementById("view-reset-zoom-btn");

// Get the editor container (adjust if needed)
const editorContainer = document.getElementById("editor");

let currentZoom = 1; // Default zoom level
const zoomStep = 0.1; // Zoom step for each button click
const maxZoom = 2; // Maximum zoom level
const minZoom = 0.5; // Minimum zoom level

// Function to apply zoom
function applyZoom() {
    editorContainer.style.transform = `scale(${currentZoom})`;
    editorContainer.style.transformOrigin = "top left"; // Keep scaling consistent
}

// Zoom In
zoomInBtn.addEventListener("click", () => {
    if (currentZoom < maxZoom) {
        currentZoom += zoomStep;
        applyZoom();
    }
});

// Zoom Out
zoomOutBtn.addEventListener("click", () => {
    if (currentZoom > minZoom) {
        currentZoom -= zoomStep;
        applyZoom();
    }
});

// Reset Zoom
resetZoomBtn.addEventListener("click", () => {
    currentZoom = 1;
    applyZoom();
});

// Keyboard Shortcuts for Zoom
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey) {
        switch (event.key) {
            case "+": 
                if (currentZoom < maxZoom) {
                    currentZoom += zoomStep;
                    applyZoom();
                }
                event.preventDefault(); // Prevent browser zoom
                break;
            case "-":
                if (currentZoom > minZoom) {
                    currentZoom -= zoomStep;
                    applyZoom();
                }
                event.preventDefault(); // Prevent browser zoom
                break;
            case "0":
                currentZoom = 1;
                applyZoom();
                event.preventDefault(); // Prevent browser zoom reset
                break;
        }
    }
});

// Insert 
// Image & Table

// Get buttons
const insertImageBtn = window.top.document.getElementById("insert-image-btn");
const insertTableBtn = window.top.document.getElementById("insert-table-btn");

// Function to insert an image
function insertImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // Only accept images

    input.addEventListener("change", () => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;
                const range = quill.getSelection();
                quill.insertEmbed(range.index, "image", imageUrl);
            };
            reader.readAsDataURL(file);
        }
    });

    input.click(); // Open file picker
}

// Function to insert a table
function insertTable(rows = 3, cols = 3) {
    let tableHTML = `<table border='1' style='border-collapse: separate; border-spacing: 20px; width: 60%; font-size: 16px; margin: 0 auto;'>`;
    
    for (let r = 0; r < rows; r++) {
        tableHTML += "<tr>";
        for (let c = 0; c < cols; c++) {
            tableHTML += "<td style='border: 2px solid black; padding: 30px; height: 100px; width: 150px; min-width: 150px; text-align: center;'> </td>"; // Set fixed height and width, padding, no resizing
        }
        tableHTML += "</tr>";
    }
    
    tableHTML += "</table>";

    const range = quill.getSelection();
    quill.clipboard.dangerouslyPasteHTML(range.index, tableHTML);

    // Apply a CSS style after insertion to lock the cell size
    const style = document.createElement('style');
    style.innerHTML = `
        .ql-editor table td {
            height: 60px !important;
            width: 120px !important;
            padding: 15px !important;
        }
    `;
    document.head.appendChild(style);
}


// Event listeners
insertImageBtn.addEventListener("click", insertImage);
insertTableBtn.addEventListener("click", () => insertTable(3, 3)); // Default 3x3 table
