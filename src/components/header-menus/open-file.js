import textDocumentData from "../entity_types/textDocument.js";
import initNewEntity from "../enity_add/addEntity.js";
// Maybe add logic here to open projects if we get a project file format established.
// For now, just importing pages.



// Select file
document.getElementById('file-input').addEventListener('change', event => {
    if (event.target.files.length > 0) {
        handleFile(event.target.files[0]);
    }
})


// Drag and drop
const fileTypeFunctions = {
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : convertWordFile, // .docx
    "text/plain" : convertTxtFile, // .txt
}

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

    if (!Object.keys(fileTypeFunctions).includes(file.type)) {
        // invalid file type, can only docx, pdf, txt
        console.error('Invalid file type');
        window.top.error('[ERROR] Invalid file type.', 5);
        return;
    }

    handleFile(file);

})

async function handleFile(file) {
    try {
        let deltaInfo;
        deltaInfo = await fileTypeFunctions[file.type](file);

        textDocumentData.textData = JSON.stringify(deltaInfo);

        const getSelectedFolderEvent = new CustomEvent('getSelectedFolder', {
            detail: textDocumentData
        });

        window.top.dispatchEvent(getSelectedFolderEvent);
        
    } catch (error) {
        console.error(error);
    }
}

async function convertWordFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({arrayBuffer});

    const quillTemp = new Quill(document.createElement('div'));
    quillTemp.clipboard.dangerouslyPasteHTML(result.value);

    return quillTemp.getContents();
}

async function convertTxtFile(file) {
    const text = await file.text();
    return { ops: [{ insert: text }]};
}