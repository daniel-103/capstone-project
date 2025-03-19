// Maybe add logic here to open projects if we get a project file format established.
// For now, just importing pages.



// Select file
document.getElementById('file-input').addEventListener('change', event => {
    if (event.target.files.length > 0) {
        handleFile(event.target.files[0]);
    }
})


// Drag and drop
const validFileTypes = [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/pdf", // .pdf
    "text/plain", // .txt
]

const icon = document.getElementById('drop-icon');

window.addEventListener('dragenter', event => {
    icon.classList.add('dragover');
})

window.addEventListener('dragover', event => {
    event.preventDefault();
});

window.addEventListener('dragleave', event => {
    if (event.relatedTarget === null) {
        icon.classList.remove('dragover');
    }
})

window.addEventListener('drop', event => {
    icon.classList.remove('dragover');
    event.preventDefault();

    if (event.dataTransfer.files.length > 1) {
        // too many files, can only upload one file
        window.top.error('[ERROR] Too many files. You can only import 1 file at a time.', 5);
        return;
    }

    const file = event.dataTransfer.files[0];

    if (!validFileTypes.includes(file.type)) {
        // invalid file type, can only docx, pdf, txt
        console.error('Invalid file type');
        window.top.error('[ERROR] Invalid file type.', 5);
        return;
    }

    handleFile(file);

})

function handleFile(file) {
    console.log(file);
    // Not sure what to do with the file from here so I'll leave it up to you (Daniel) to import it.
}

