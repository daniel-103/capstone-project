# Text Editor Documentation
Framework for text editor is Quill
Link to Quill Documentaion: https://quilljs.com/docs/quickstart/
Link to Quill Github: https://github.com/slab/quill
The text editor features a toolbar for formatting text (i.e. bold, italics, fonts, etc.)

## Files Overview

### 1. `text_editor.js`

**Key Components:**
toolbarOptions: Array holding the name for buttons on the toolbar

Section class: Class for creating objects 
-	Class Vars: startInd, endInd, labelBox, lineElement

Creating a section: 
Using Quill's getSelection(), we can use the users selected range of text which is used to find the 
starting index, ending index for creating the section and its UI


### 2. `text_editor.css`
Used for styling the editor, toolbar, section UI, and word counters

### 3. `text_editor.html`
HTML for the editor and its components
Links to `text_editor.js` for function
Links to `text_editor.css` for styling


## Exporting Text to File Format
In the text editor IFrame, there is a green Export button that allows the user to convert the text into file formats (PDF, DOCX, TXT). When the user clicks on the button, there is a dropdown menu that displays the file formats. Some of the file formats when clicked (PDF, DOCX for example) are particular exporting details such setting the margin size or including headers and footers.

**Key Components:**
```
<script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/docx@7.1.0/build/index.min.js"></script>
```
These are the modules for PDF and DOCX

```
// Event listeners for export buttons
document.getElementById('exportPDF').addEventListener('click', () => populatePopupContent("PDF"));
document.getElementById('exportDOCX').addEventListener('click', () => populatePopupContent("DOCX"));
```
These are the event listeners for the exporting settings
