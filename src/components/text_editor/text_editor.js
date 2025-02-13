const BlockEmbed = Quill.import('blots/block');
const Inline = Quill.import('blots/inline');
const icons = Quill.import('ui/icons');

class Section {
  constructor(startInd,endInd, labelBox, lineElement) {
    this.startInd = startInd;
    this.endInd = endInd;
    this.labelBox = labelBox;
    this.lineElement = lineElement;
  }

  updateLineHeight() {
    const editor = document.querySelector('.ql-editor');
    const editorScrollTop = editor.scrollTop; // Get the scroll position of the editor
    
    const newStartBounds = quill.getBounds(this.startInd);
    const newEndBounds = quill.getBounds(this.endInd);

    const newTopPosition = newStartBounds.top + editorScrollTop;
    const newBottomPosition = newEndBounds.top + newEndBounds.height + editorScrollTop;

    // Update the height of the line element
    this.lineElement.style.height = `${newBottomPosition - newTopPosition}px`;
    this.labelBox.style.top = `${newTopPosition}px`; // Update the position of the label box
  }

  // Method to update the end index based on the content in the label box
  updateEndIndex() {
    const contentLength = quill.getText(this.startInd).length;
    this.endInd = this.startInd + contentLength;
  }
}

let sections = [];

class Counter {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.container = document.querySelector(options.container);
    quill.on(Quill.events.TEXT_CHANGE, this.update.bind(this));
  }

  calculate() {
    const text = this.quill.getText();

    if (this.options.unit === 'word') {
      const trimmed = text.trim();
      // Splitting empty text returns a non-empty array
      return trimmed.length > 0 ? trimmed.split(/\s+/).length : 0;
    } else {
      return text.length;
    }
  }

  update() {
    const length = this.calculate();
    let label = this.options.unit;
    if (length !== 1) {
      label += 's';
    }
    this.container.innerText = `${length} ${label}`;
  }
}

Quill.register('modules/counter', Counter);


const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
  
  ['clean'],
  ['section-button']

                                         // remove formatting button
  
];

const quill = new Quill('#editor', {
  modules: {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        'section-button': function() {
          createSection();
        }
      }
    },  
    counter: {
      container: '#counter',
      unit: 'word'
    }
  },
  theme: 'snow',
  history: {
    delay: 2000,
    maxStack: 500,
    userOnly: true
  }
});

let sectionButton = document.querySelector('.ql-section-button');
if (sectionButton) {
  sectionButton.innerHTML = 'C';  // Set "C" as the button's icon text

}
function createSection() {
  const range = quill.getSelection();
  const text = quill.getText(range.index, range.length);
  const startInd = range.index;
  const endInd = range.index + range.length;
  const startBounds = quill.getBounds(startInd);
  const endBounds = quill.getBounds(endInd);
  // Calculate the vertical position of the selection (accounting for scroll position)
  const editor = document.querySelector('.ql-editor');
  const editorScrollTop = editor.scrollTop; // Get the scroll position of the editor
  const topPosition = startBounds.top + editorScrollTop; // Add scroll position to top
  const bottomPosition = endBounds.top + endBounds.height + editorScrollTop; // Adjust for the bottom of the selection



  // Create a line element in the left container
  const lineElement = document.createElement('div');
  lineElement.style.position = 'absolute';
  lineElement.style.top = `${topPosition}px`; // Align the top of the line with the top of the selection
  lineElement.style.left = '70px'; // A slight left margin
  lineElement.style.width = '5px'; // Line width
  lineElement.style.backgroundColor = 'red'; // Line color
  lineElement.style.height = `${bottomPosition - topPosition}px`; // Line height based on the selection height
  
  // Create a label box (editable text)
  const labelBox = document.createElement('div');
  labelBox.contentEditable = true; // Makes it editable
  labelBox.style.position = 'absolute';
  labelBox.style.top = `${topPosition}px`; // Slightly above the start of the line
  labelBox.style.left = '0px'; // Space to the right of the line
  labelBox.style.padding = '0px';
  //labelBox.style.border = '1px solid black';
  labelBox.style.backgroundColor = 'lightgray';
  labelBox.style.width = '70px'; // Fixed width for the label
  labelBox.textContent = 'Chapter'; // Default text
  labelBox.style.zIndex = '99';
  // Append the line element to the line container
  const lineContainer = document.getElementById('line-container');
  lineContainer.appendChild(lineElement);
  lineContainer.appendChild(labelBox);

  const section = new Section(startInd, endInd,labelBox,lineElement);
  sections.push(section);

  quill.on('text-change', (delta, oldDelta, source) => {
    if (source === 'user') {
      // If the text change is user-driven, check if the section's text was modified
      section.updateLineHeight();
    }
  });

  // Listen for input changes (when the label text is modified)
  labelBox.addEventListener('input', () => {
    section.updateEndIndex(); // Update the end index based on the new length of the label's text
    section.updateLineHeight(); // Update the line height to match the new length
  });
}



// This ensures the editor works as expected.
export { quill };

// Define global variables to hold the fileName and predefinedText
let globalFileName = '';
let globalPredefinedText = {};

window.addEventListener('message', (event) => {
  // Check if the event data contains the templateId and predefinedText
  if (event.data && event.data.templateId && event.data.predefinedText) {
    const templateId = event.data.templateId;
    globalPredefinedText = event.data.predefinedText; // Assign to global variable
    console.log('Received Template ID in text_editor.js:', templateId);
    console.log('Received Predefined Text in text_editor.js  j:', JSON.stringify(globalPredefinedText));
    console.log('Received Predefined Text in text_editor.js:', event.data.predefinedText);
  }

  // Check if the event data contains the fileClicked event
  if (event.data.type === 'fileClicked') {
    const fileName = event.data.fileName;
    console.log(`Received file name: ${fileName}`);
    globalFileName = fileName;

    // Navigate through the globalPredefinedText to find the file content
    let fileContent = null;
    for (const key in globalPredefinedText) {
      if (globalPredefinedText.hasOwnProperty(key)) {
        const value = globalPredefinedText[key];
        
        if (typeof value === 'string') {
          // The key is a file
          if (key === fileName) {
            fileContent = value;
            break;
          }
        } else if (typeof value === 'object') {
          // The key is a folder
          if (value.hasOwnProperty(fileName)) {
            fileContent = value[fileName];
            break;
          }
        }
      }
    }

    quill.setText(fileContent);
  }
});