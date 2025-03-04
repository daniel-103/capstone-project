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
    notificationMessage.innerHTML = message;
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
const editorContainer = document.querySelector(".editor-container");
const editor = document.getElementById("editor");

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

// Format
// Header, Footer & Page Numbers

const insertHeaderBtn = window.top.document.getElementById("insert-header-btn");
const insertFooterBtn = window.top.document.getElementById("insert-footer-btn");

// Function to insert a header with a separator line
function insertHeader() {
    const headerHTML = `
        <div style="text-align: center; font-size: 18px; font-weight: bold; padding: 10px;">
            [Header]
        </div>
        <hr style="border: 2px solid black; margin-bottom: 10px;">`; // Line below header

    quill.clipboard.dangerouslyPasteHTML(0, headerHTML); // Insert at the beginning
}

// Function to insert a footer with a separator line
function insertFooter() {
    const footerHTML = `
        <hr style="border: 2px solid black; margin-top: 10px;"> <!-- Line above footer -->
        <div style="text-align: center; font-size: 16px; font-style: italic; padding: 10px;">
            [Footer]
        </div>`; 

    quill.clipboard.dangerouslyPasteHTML(quill.getLength(), footerHTML); // Insert at the end
}

// Event Listeners
insertHeaderBtn.addEventListener("click", insertHeader);
insertFooterBtn.addEventListener("click", insertFooter);


// Function to insert page numbers
function insertPageNumbers() {
    const totalPages = Math.ceil(quill.getLength() / 1000); // Assuming 1000 characters per page for simplicity
    let pageNumberHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        pageNumberHTML += `
            <div style="text-align: right; font-size: 12px; padding: 10px;">
                ${i}
            </div>
            <hr style="border: 2px solid black; margin-bottom: 10px;"> <!-- Line below header -->
        `;
    }

    quill.clipboard.dangerouslyPasteHTML(quill.getLength(), pageNumberHTML); // Insert at the end
}

// Event Listeners
const formatPageNumbersBtn = window.top.document.getElementById("insert-page-number-btn");
formatPageNumbersBtn.addEventListener("click", insertPageNumbers);


// Tools
// Spelling & Grammer
const spellingBtn = window.top.document.getElementById("tools-spelling-btn");

// Function to check spelling & grammar using LanguageTool API
async function checkSpellingGrammar() {
    const text = quill.getText(); // Get the content of the editor

    if (!text.trim()) {
        showNotification("The document is empty. Please type something first.");
        return;
    }

    try {
        const response = await fetch("https://api.languagetool.org/v2/check", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ text: text, language: "en-US" })
        });

        const result = await response.json();

        if (result.matches.length === 0) {
            showNotification("No spelling or grammar issues found!");
            return;
        }

        // Format errors & suggestions
        let message = "<strong>Issues found:</strong><br><br>";
        result.matches.forEach((error, index) => {
            message += `<strong>${index + 1}. ${error.message}</strong><br>`;
            message += `❌ <span style="color: red;">${error.context.text}</span><br>`;
            if (error.replacements.length > 0) {
                message += `✅ Suggested: <span style="color: green;">${error.replacements.map(r => r.value).join(", ")}</span><br><br>`;
            }
        });

        showNotification(message);

    } catch (error) {
        console.error("Error checking spelling & grammar:", error);
        showNotification("Failed to check spelling & grammar. Please try again later.");
    }
}

// Attach event listener
spellingBtn.addEventListener("click", checkSpellingGrammar);


// Word Count
// Get the button
const wordCountBtn = window.top.document.getElementById("tools-word-count-btn");

// Function to count words in the editor
function countWords() {
    const text = quill.getText().trim(); // Get text from Quill and remove extra spaces
    const words = text.length > 0 ? text.split(/\s+/).length : 0; // Split by whitespace & count

    // Show the word count in the notification modal
    showNotification(`<strong>Word Count:</strong> ${words}`);
}

// Add event listener to the button
wordCountBtn.addEventListener("click", countWords);

// Get the editor and the custom context menu for right-click operations
const contextMenu = window.top.document.getElementById("custom-context-menu");

// Get menu buttons
const cutBtn = window.top.document.getElementById("context-cut");
const copyBtn = window.top.document.getElementById("context-copy");
const pasteBtn = window.top.document.getElementById("context-paste");
const insertImageConBtn = window.top.document.getElementById("context-insert-image");
const insertTableConBtn = window.top.document.getElementById("context-insert-table");

// Prevent the default right-click menu and show our custom menu
editor.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    const selection = quill.getSelection();
    const hasSelection = selection && selection.length > 0;

    // Show different options based on text selection
    cutBtn.style.display = hasSelection ? "block" : "none";
    copyBtn.style.display = hasSelection ? "block" : "none";
    
    pasteBtn.style.display = "block"; // Always show paste
    insertImageConBtn.style.display = hasSelection ? "none" : "block";
    insertTableConBtn.style.display = hasSelection ? "none" : "block";

    // Calculate the position of the context menu to be in the middle of the screen
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const left = (windowWidth - menuWidth) / 2;
    const top = (windowHeight - menuHeight) / 2;

    // Position the menu at the cursor's position
    contextMenu.style.left = `${left}px`;
    contextMenu.style.top = `${top}px`;
    contextMenu.style.display = "block";
});

// Hide the menu when clicking elsewhere
document.addEventListener("click", () => {
    contextMenu.style.display = "none";
});

// Clipboard operations
cutBtn.addEventListener("click", () => {
    document.execCommand('cut');
    contextMenu.style.display = "none";
});

copyBtn.addEventListener("click", () => {
    document.execCommand('copy');
    contextMenu.style.display = "none";
});

pasteBtn.addEventListener("click", async () => {
    document.execCommand('paste');
    contextMenu.style.display = "none";
});

insertImageConBtn.addEventListener("click", () => {
    insertImage();
    contextMenu.style.display = "none";
})

insertTableConBtn.addEventListener("click", () => {
    insertTable();
    contextMenu.style.display = "none";
})