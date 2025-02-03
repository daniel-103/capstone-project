# Text Editor Documentation

The text editor is built upon the CKEditor 5 framework, starting with the CKEditor Builder
Link to CKEditor 5 Documentation: https://ckeditor.com/docs/ckeditor5/latest/index.html
Free License key allows 1000 load/month, which should be enough

The toolbar can be edited in text_editor.js

`text_editor.js`
``` js
toolbar: {
		items: [
			...
		],
		shouldNotGroupWhenFull: false
	}, 
```

where ... represents each component of the text editor tool bar

Most functionality of the rich-text features comes from CKEditor's plugins, which are located below the toolbar items

`text_editor.js`
``` js
plugins: [
    ...
]
```

where ... represents all of the plugins that the project is using.
Note that all plugins used are under the free license for CKEditor 5, other functionalities that require premium access
and are a planned addition will be implemented ourselves

The style sheet for the customization of the text editor's appereance can be found in text_editor.css

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