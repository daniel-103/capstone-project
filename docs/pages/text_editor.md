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
-	Class Vars: startInd, endInd, labelBox, lineElement, labelMoveTab

Creating a section: 
Using Quill's getSelection(), we can use the users selected range of text which is used to find the 
starting index, ending index for creating the section and its UI

Creating a subsection: Within an already created section, make a selection with that section can create a new 
section. This will add the new section to the children list of the larger section.

Section moving: Clicking and dragging the white box next to the section label will allow
the section and the text within to be moved to another spot within the text.
If a section contains a subsection, both the section and its child subsection will move. The 
subsection's position stays the same relative to its parent section but moves 
in tandem with its parent relative to the overall text.

Section data storage: Not currently in data base. A section alone is stored in the sections array.
A subsection will instead be appended to its parent section children list. Sections are treated 
similar to a tree. The text editor itself is can be considered the root, and each section is a node with subsections
branching from their respective sections. This should be similar to other storage methods in the database 
with other functions of the program.
Class variables should be sufficient for storing the data into the database when that is implemented in the future.

### 2. `text_editor.css`
Used for styling the editor, toolbar, section UI, and word counters

### 3. `text_editor.html`
HTML for the editor and its components
Links to `text_editor.js` for function
Links to `text_editor.css` for styling


## Exporting Text to File Format
In the text editor IFrame, there is a green Export button that allows the user to convert the text into file formats (PDF, DOCX, TXT). When the user clicks on the button, there is a dropdown menu that displays the file formats. Some of the file formats when clicked (PDF, DOCX for example) have particular exporting details such setting the margin size or including headers and footers while others like TXT do not.

**Key Components:**
```
<script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/docx@7.1.0/build/index.min.js"></script>
```
These are the modules for the file formats (PDF and DOCX for example)

```
// Event listeners for export buttons
document.getElementById('exportPDF').addEventListener('click', () => populatePopupContent("PDF"));
document.getElementById('exportDOCX').addEventListener('click', () => populatePopupContent("DOCX"));
document.getElementById('exportTXT').addEventListener('click', async () => {...});
```
These are the event listeners for the exporting settings in export.js
The populatePopupContent function makes the exporting setting popup for the exporting details shown below:

```
// Populate settings popup content
const populatePopupContent = (format) => {
  currentFormat = format;

  // Clear previous settings
  settingsContent.innerHTML = "";

  if (format === "PDF") {
    exportTitle.textContent = "PDF Export Settings";

    // PDF-specific settings
    settingsContent.innerHTML = `
      <div>
        <label for="pageSize">Page Size:</label>
        <select id="pageSize">
          <option value="A4">A4</option>
          <option value="Letter">Letter</option>
          <option value="Legal">Legal</option>
        </select>
      </div>
      <div>
        <label for="orientation">Orientation:</label>
        <select id="orientation">
          <option value="portrait">Portrait</option>
          <option value="landscape">Landscape</option>
        </select>
      </div>
      <div>
        <label for="margins">Margins:</label>
        <input type="number" id="margins" value="50" min="10" max="100" />
      </div>
    `;
  } else if (format === "DOCX") {
    exportTitle.textContent = "DOCX Export Settings";

    // DOCX-specific settings
    settingsContent.innerHTML = `
      <div>
        <label for="includeTOC">Include Table of Contents:</label>
        <input type="checkbox" id="includeTOC" />
      </div>
      <div>
        <label for="includeHeaderFooter">Include Header/Footer:</label>
        <input type="checkbox" id="includeHeaderFooter" />
      </div>
    `;
  }

  // Show the popup
  settingsPopup.style.display = "block";
};
```
