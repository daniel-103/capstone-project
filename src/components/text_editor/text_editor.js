const BlockEmbed = Quill.import('blots/block');
const Inline = Quill.import('blots/inline');
const icons = Quill.import('ui/icons');


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
  theme: 'snow'
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

};

function updateLinePositionAndHeight() {
  const range = quill.getSelection();
  if (!range || range.length === 0) return; // If no selection, don't update

  const startInd = range.index;
  const endInd = range.index + range.length;
  const startBounds = quill.getBounds(startInd);
  const endBounds = quill.getBounds(endInd);

  const editorScrollTop = editor.scrollTop;
  const topPosition = startBounds.top + editorScrollTop;
  const bottomPosition = endBounds.top + endBounds.height + editorScrollTop;

  // Update the position and height of the line
  lineElement.style.top = `${topPosition}px`;
  lineElement.style.height = `${bottomPosition - topPosition}px`;

  // Update label position
  labelBox.style.top = `${topPosition}px`;
}

// Monitor for changes in the Quill editor
quill.on('text-change', function(delta, oldDelta, source) {
  updateLinePositionAndHeight();
});

// Update line position initially
updateLinePositionAndHeight();



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