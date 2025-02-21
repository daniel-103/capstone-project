const BlockEmbed = Quill.import('blots/block');
const Inline = Quill.import('blots/inline');
const icons = Quill.import('ui/icons');

class Section {
  constructor(startInd,endInd, labelBox, lineElement, labelMoveTab) {
    this.startInd = startInd;
    this.endInd = endInd;
    this.labelBox = labelBox;
    this.labelMoveTab = labelMoveTab;
    this.lineElement = lineElement;
    this.children = [];
    this.parent = null;
  }

  updateLineHeight() {
    
    const editor = document.querySelector('.ql-editor');
    const editorScrollTop = editor.scrollTop; // Get the scroll position of the editor
    
    const newStartBounds = quill.getBounds(this.startInd);
    const newEndBounds = quill.getBounds(this.endInd);

    const newTopPosition = newStartBounds.top + editorScrollTop - 15;
    const newBottomPosition = newEndBounds.top + newEndBounds.height + editorScrollTop;


    // Update the height of the line element
    this.lineElement.style.top = `${newTopPosition}px`;

    this.lineElement.style.height = `${newBottomPosition - newTopPosition}px`;
    this.labelBox.style.top = `${newTopPosition}px`; // Update the position of the label box
    this.labelMoveTab.style.top = `${newTopPosition}px`;
    console.log("Updated Section:", {
      start: this.startInd,
      end: this.endInd,
      top: newTopPosition,
      bottom: newBottomPosition
    });
  }

  updateDimensions(delta) {
    let shift = 0;

    delta.ops.forEach(op => {
      if (op.retain !== undefined) {
        shift += op.retain;
      }

      if (op.insert) {
        const insertLength = typeof op.insert === 'string' ? op.insert.length : 1;

        if (shift <= this.startInd) {
          this.startInd += insertLength;
          this.endInd += insertLength;
        } else if (shift <= this.endInd) {
          this.endInd += insertLength;
        }

        shift += insertLength;
      } 
      
      else if (op.delete) {
        const deleteLength = op.delete;

        if (shift < this.startInd) {
          const change = Math.min(deleteLength, this.startInd - shift);
          this.startInd -= change;
          this.endInd -= change;
        } else if (shift < this.endInd) {
          const change = Math.min(deleteLength, this.endInd - shift);
          this.endInd -= change;
        }

        shift -= deleteLength;
      }
    });

    this.startInd = Math.max(0, this.startInd);
    this.endInd = Math.max(this.startInd, this.endInd);
    this.updateLineHeight();
  }

  setParent(parentSection) {
    this.parent = parentSection;
    parentSection.children.push(this);
    console.log(`Subsection created under parent: ${parentSection.labelBox.textContent}`);
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
  const dim = getDimensions();
  const startInd = dim[0];
  const endInd = dim[1];
  const topPosition = dim[2];
  const bottomPosition = dim[3];
  const labelTop = dim[4];
  
  // Create a line element in the left container
  const lineElement = document.createElement('div');
  lineElement.style.position = 'absolute';
  lineElement.style.top = `${topPosition}px`; // Align the top of the line with the top of the selection
  lineElement.style.left = '120px'; // A slight left margin
  lineElement.style.width = '1045px'; // Line width
  //lineElement.style.backgroundColor = 'red'; // Line color
  lineElement.style.margin = '10px';
  lineElement.style.border = 'dotted black';
  //lineElement.style.boxShadow = '5px 5px lightgray';
  lineElement.style.borderRadius = '25px';
  lineElement.style.pointerEvents = 'none';
  lineElement.style.translate = '50px, 100px';
  
  
  lineElement.style.zIndex = '99';
  lineElement.style.height = `${bottomPosition - topPosition - 10}px`; // Line height based on the selection height
  
  // Create a label box (editable text)
  const labelBox = document.createElement('div');
  labelBox.contentEditable = true; // Makes it editable
  labelBox.style.position = 'absolute';
  labelBox.style.top = `${labelTop}px`; // Slightly above the start of the line
  labelBox.style.left = '20px'; // Space to the right of the line
  labelBox.style.padding = '0px';
  labelBox.style.backgroundColor = 'lightgray';
  labelBox.style.width = '70px'; // Fixed width for the label
  labelBox.textContent = 'Chapter'; // Default text
  labelBox.style.zIndex = '99';

  // Create a labelMoveTab (square to the left of labelBox)
  const labelMoveTab = document.createElement('div');
  labelMoveTab.style.position = 'absolute';
  labelMoveTab.style.top = `${labelTop}px`; // Same top position as labelBox
  labelMoveTab.style.left = '5px'; // Positioned to the left of labelBox
  labelMoveTab.style.width = '15px'; // Smaller width for the square
  labelMoveTab.style.height = '20px'; // Match height with labelBox
  labelMoveTab.style.backgroundColor = '#eeeeee'; // Different color to distinguish
  labelMoveTab.style.border = `1px solid black`;
  labelMoveTab.style.cursor = 'grab';
  labelMoveTab.style.zIndex = '100';
  labelMoveTab.style.textAlign = 'center'; // Center text horizontally
  labelMoveTab.style.lineHeight = '20px'; // Align | vertically
  labelMoveTab.style.fontWeight = 'bold'; // Make | more visible
  labelMoveTab.style.fontSize = '14px'; // Adjust font size for better fit
  labelMoveTab.style.userSelect = 'none';

  // Add the "|" symbol
  labelMoveTab.textContent = '|';

  
  // Append the line element to the line container
  const lineContainer = document.getElementById('line-container');
  lineContainer.appendChild(lineElement);
  lineContainer.appendChild(labelBox);
  lineContainer.appendChild(labelMoveTab);

  const section = new Section(startInd, endInd, labelBox, lineElement, labelMoveTab);
  // Check if the new section is inside an existing section (subsection)
  const parentSection = findParentSection(section);
  if (parentSection) {
    section.setParent(parentSection);
  } else {
    sections.push(section);
  }

  const editorLength = quill.getLength();
  if (endInd >= editorLength - 1) {
    quill.insertText(editorLength, '\n');
  }

  makeDraggable(labelMoveTab, labelBox, section);

  quill.on('text-change', (delta, oldDelta, source) => {
    if (source === 'user') {
      
      sections.forEach(section => section.updateDimensions(delta));
      sections.forEach(section => section.updateLineHeight());
    }
  });
}

function findParentSection(newSection) {
  // Check if the new section is within the bounds of any existing section
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i];
    if (newSection.startInd >= section.startInd && newSection.endInd <= section.endInd) {
      console.log(`Section is inside another section: ${section.labelBox.textContent}`);
      return section; // This section is a subsection
    }
  }
  return null; // No parent found, so it's a top-level section
}

function getDimensions() {
  const range = quill.getSelection();
  //const text = quill.getText(range.index, range.length);
  const startInd = range.index;
  const endInd = range.index + range.length;
  const startBounds = quill.getBounds(startInd);
  const endBounds = quill.getBounds(endInd);
  // Calculate the vertical position of the selection (accounting for scroll position)
  const editor = document.querySelector('.ql-editor');
  const editorScrollTop = editor.scrollTop; // Get the scroll position of the editor
  const topPosition = startBounds.top + editorScrollTop - 15; // Add scroll position to top
  const bottomPosition = endBounds.top + endBounds.height + editorScrollTop; // Adjust for the bottom of the selection
  const labelTop = startBounds.top + editorScrollTop;

  return [startInd, endInd, topPosition, bottomPosition, labelTop];
}

function makeDraggable(labelMoveTab, labelBox, section) {
  let startY = 0;
  let startTop = 0;
  let ghostElement = null;
  let editor = document.querySelector('.ql-editor');

  labelMoveTab.style.cursor = 'grab';

  labelMoveTab.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startY = e.clientY;
    startTop = parseFloat(labelMoveTab.style.top) || 0;
    labelMoveTab.style.cursor = 'grabbing';

    let contents = quill.getContents(section.startInd, section.endInd - section.startInd);
    let length = section.endInd - section.startInd;
    let initialStartInd = section.startInd;
    

    ghostElement = document.createElement('div');
    ghostElement.style.position = 'absolute';
    ghostElement.style.opacity = '.3';
    ghostElement.style.pointerEvents = 'none';
    ghostElement.style.background = '#ffffff';
    ghostElement.style.border = '1px dashed gray';
    ghostElement.style.padding = '5px';
    ghostElement.style.zIndex = '100';
    ghostElement.innerHTML = editor.innerHTML.substring(section.startInd, section.endInd);
    document.body.appendChild(ghostElement);

    quill.deleteText(section.startInd, length);

    function onMouseMove(event) {
      let deltaY = event.clientY - startY;
      let newTop = startTop + deltaY;
      
      const editorRect = editor.getBoundingClientRect();
      const minTop = editorRect.top + window.scrollY;
      const maxTop = editorRect.bottom + window.scrollY - 20;

      if (newTop < minTop) newTop = minTop;
      if (newTop > maxTop) newTop = maxTop;

      labelBox.style.top = `${newTop}px`;
      labelMoveTab.style.top = `${newTop}px`;
      let closestIndex = section.startInd;
      let closestDistance = Infinity;

      for (let i = 0; i < quill.getLength(); i++) {
        let bounds = quill.getBounds(i);
        let position = bounds.top + editor.scrollTop + editorRect.top;
        let distance = Math.abs(position - newTop);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      let ghostBounds = quill.getBounds(closestIndex);
      ghostElement.style.top = `${ghostBounds.top + editor.scrollTop + editorRect.top}px`;
      ghostElement.style.left = `${editorRect.left + 10}px`;
      ghostElement.style.width = 'calc(100% - 20px)';
    }

    function onMouseUp() {
      labelMoveTab.style.cursor = 'grab';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (ghostElement) {
        document.body.removeChild(ghostElement);
        ghostElement = null;
      }

      const editorRect = editor.getBoundingClientRect();
      let closestIndex = section.startInd;
      let closestDistance = Infinity;
      for (let i = 0; i < quill.getLength(); i++) {
        let bounds = quill.getBounds(i);
        let position = bounds.top + editor.scrollTop + editorRect.top;
        let distance = Math.abs(position - parseFloat(labelMoveTab.style.top));

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      quill.insertText(closestIndex, '\n', 'user');
      quill.updateContents({ ops: [{ retain: closestIndex }, ...contents.ops] });
      section.startInd = closestIndex;
      section.endInd = closestIndex + length;
      section.updateLineHeight();
      if (section.children.length > 0) {

        section.children.forEach(child => {
          let childOffset = child.startInd - initialStartInd;
          let childLength = child.endInd - child.startInd;
          child.startInd = closestIndex + childOffset;
          child.endInd = closestIndex + childLength + childOffset;
          child.updateLineHeight();
        });
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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