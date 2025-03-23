import saveTextDocument from "./text_editor_save.js";
import { textToSpeech } from './multimedia.mjs';
import { saveSections, getSections } from "./section_save.js";
import { loadSections } from "./section_load.js";

const sections = [];
// Wee Woo Wee Woo Work in Progress Please be Patient
// Not permanent solution to get the entityId for the current page
// Saving and loading sections needed to be fixed to implement current page sections first
const projectId = localStorage.getItem('projectId'); // Get the projectId 
const projectData = await window.top.db.get(projectId); // Then the project data
const entityId = projectData.childrenIds[0]; // Temp solution to getting the writing page's entityId 
let entityData = await window.top.db.get(entityId);
//console.log(entityData.sections);
//console.log(entityData);
//console.log(entityId);
// Get text data from database
// Using urlParams not working for this, so its breaking saving text data and sections. Do not use atm

//const urlParams = new URLSearchParams(window.location.search);
//console.log(urlParams);
//entityId = urlParams.get("entityId");
//console.log(entityId);
//const entityId = currentPage;

let initialTextData = "{\"ops\":[{\"insert\":\"123456789\\n\"}]}";
if (!entityId) {
  console.error("No entity ID in URL.");
} else {
  try {
      const entityData = await window.top.db.get(entityId);
      initialTextData = entityData.textData;

    } catch (err) {
      console.error("Failed to fetch document:", err);
    }
}

initialTextData = JSON.parse(initialTextData);

class Section {
  constructor(startInd,endInd, labelBox, lineElement, labelMoveTab, color, lineStyle, labelText) {
    this.startInd = startInd;
    this.endInd = endInd;
    this.labelBox = labelBox;
    this.labelMoveTab = labelMoveTab;
    this.lineElement = lineElement;
    this.children = [];
    this.color = color;
    this.lineStyle = lineStyle;
    this.labelText = labelText;
    
    //this.parent = null;
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
    let lineContainer = this.labelBox.parentElement;
    console.log(lineContainer.children[3]);
    lineContainer.children[3].style.top = `${newTopPosition}px`;
    lineContainer.children[4].style.top = `${parseInt(colorDropdown.style.top) + parseInt(colorDropdown.style.height)+ 5}px`;
    console.log(colorDropdown);

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
    //this.parent = parentSection;
    parentSection.children.push(this);
    console.log(`Subsection created under parent: ${parentSection.labelBox.textContent}`);
  }

}

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
  ['section-button'],
  ['ai-assistant'],
  ['research-button'],
  ['text-to-speech']

                                         // remove formatting button
  
];

const quill = new Quill('#editor', {
  modules: {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        'section-button': function() {
          createSection();
        },
        'ai-assistant': function() {
          const aiAssistantModal = document.getElementById("ai-assistant-modal");
          const editorContainer = document.querySelector('.editor-container');
//          editorContainer.classList.toggle('expanded');
//          aiAssistantModal.classList.toggle('expanded');
          if (aiAssistantModal.style.display === "block") {
            aiAssistantModal.style.display = "none";
          } else {
            aiAssistantModal.style.display = "block";
          }
        },
        'research-button': function() {
          const researchModal = document.getElementById('research-modal');
          const editorContainer = document.querySelector('.editor-container');
//          editorContainer.classList.toggle('expanded');
//          researchModal.classList.toggle('expanded');
          if (researchModal.style.display === "block") {
            researchModal.style.display = "none";
          } else {
            researchModal.style.display = "block";
          }
        },
        'text-to-speech': async function() {
          const audioPlayer = document.getElementById('audio-player');
          const audioSource = document.getElementById('audio-source');
          const audio = document.getElementById('audio');

          if (audioPlayer.style.display === "block") {
            audioPlayer.style.display = "none";
          } else {
            audioPlayer.style.display = "block";
          }

          const quillContent = quill.getText().trim();
          const audioUrl = await textToSpeech(quillContent);
          audioSource.src = audioUrl;
          audio.load();
          audio.play();
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




// Update initial information 
quill.setContents(initialTextData);

let aiButton = document.querySelector('.ql-ai-assistant');
if (aiButton) {
  aiButton.innerHTML = '🤖'; 
}

let researchButton = document.querySelector('.ql-research-button');
if (researchButton) {
  researchButton.innerHTML = '🔍'; 
}

let textToSpeechButton = document.querySelector('.ql-text-to-speech');
if (textToSpeechButton) {
  textToSpeechButton.innerHTML = '🔊'; 
}

let sectionButton = document.querySelector('.ql-section-button');
if (sectionButton) {
  sectionButton.innerHTML = 'C';  // Set "C" as the button's icon text

}

export function createSection() {
  let dim;
  let color;
  let lineStyle;
  let labelText;
  if (arguments.length == 1) { // JavaScript's way of overloading a function. arguments[0] will be the section being loaded back onto the page. Used in secion_load.js
    //console.log(arguments[0]);
    dim = getDimensions(arguments[0]);
    color = arguments[0].color;
    lineStyle = arguments[0].lineStyle;
    labelText = arguments[0].labelText;
    console.log(arguments[0]);
    //console.log("Dim: ",dim);
  } else {
    dim = getDimensions();
    color = 'black';
    lineStyle = 'dotted';
    labelText = 'Chapter';
  }
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
  lineElement.style.borderStyle = lineStyle;
  lineElement.style.borderColor = color;
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
  labelBox.textContent = labelText; // Default text
  labelBox.style.zIndex = '99';

  labelBox.addEventListener('input', () => {
    section.labelText = labelBox.textContent;
  });

  // Create a labelMoveTab (square to the left of labelBox)
  const labelMoveTab = document.createElement('div');
  labelMoveTab.style.position = 'absolute';
  labelMoveTab.style.top = `${labelTop}px`; // Same top position as labelBox
  labelMoveTab.style.left = `${parseInt(labelBox.style.left) - 20}`; // Positioned to the left of labelBox
  labelMoveTab.style.width = '15px'; // Smaller width for the square
  labelMoveTab.style.height = '19.5px'; // Match height with labelBox
  labelMoveTab.style.backgroundColor = '#eeeeee'; // Different color to distinguish
  //labelMoveTab.style.border = `1px solid black`;
  labelMoveTab.style.cursor = 'grab';
  labelMoveTab.style.zIndex = '100';
  labelMoveTab.style.textAlign = 'center'; // Center text horizontally
  labelMoveTab.style.lineHeight = '20px'; // Align | vertically
  labelMoveTab.style.fontWeight = 'bold'; // Make | more visible
  labelMoveTab.style.fontSize = '14px'; // Adjust font size for better fit
  labelMoveTab.style.userSelect = 'none';

  // Add the "|" symbol
  labelMoveTab.textContent = '-';

  // Create a color dropdown button
  const colorDropdown = document.createElement('select');
  colorDropdown.id = 'colorDropdown';
  colorDropdown.style.position = 'relative';
  colorDropdown.style.top = `${labelTop}px`; // Align with labelBox
  colorDropdown.style.left = `${parseInt(labelBox.style.left) + parseInt(labelBox.style.width)}px`; // Place next to labelBox
  colorDropdown.style.width = '25px'; // Small square dropdown
  colorDropdown.style.height = '22px'; // Match labelBox height
  colorDropdown.style.border = '1px solid black';
  colorDropdown.style.padding = '0';
  colorDropdown.style.cursor = 'pointer';
  colorDropdown.style.backgroundColor = 'black'; // Default color
  colorDropdown.style.zIndex = '100';
  // Define color options
  const colors = [
    "black", "red", "lightblue", "green", "orange", "lightpurple",
    "yellow", "cyan", "magenta", "gray", "brown", "pink",
    "lime", "teal", "navy", "gold", "silver", "maroon",
    "olive", "indigo", "violet", "turquoise", "beige"
  ];

  // Populate dropdown with color choices
  colors.forEach(color => {
    let option = document.createElement('option');
    option.value = color;
    option.style.backgroundColor = color; // Set background color of option
    option.textContent = " "; // Empty text so only color is shown
    //option.style.position = 'absolute';
    colorDropdown.appendChild(option);
  });

  // Change line color & dropdown background when selecting a color
  colorDropdown.addEventListener('change', () => {
    lineElement.style.borderColor = colorDropdown.value;
    colorDropdown.style.backgroundColor = colorDropdown.value; // Change dropdown to selected color
    section.color = colorDropdown.value;
  });


  // Create a line type dropdown button
  const lineTypeDropdown = document.createElement('select');
  lineTypeDropdown.id = 'lineTypeDropdown';
  lineTypeDropdown.style.position = 'relative';
  lineTypeDropdown.style.top = `${parseInt(colorDropdown.style.top) + parseInt(colorDropdown.style.height)+ 5}px`; // Below the color dropdown
  lineTypeDropdown.style.left = `${parseInt(labelBox.style.left) + parseInt(labelBox.style.width) - 25}px`; // Same left position
  lineTypeDropdown.style.width = '25px'; // Slightly wider for line type selection
  lineTypeDropdown.style.height = '22px'; // Match height of color dropdown
  lineTypeDropdown.style.border = '1px solid black';
  lineTypeDropdown.style.padding = '0';
  lineTypeDropdown.style.cursor = 'pointer';
  lineTypeDropdown.style.backgroundColor = 'white'; // Default background
  lineTypeDropdown.style.zIndex = '99';
  // Define line type options
  const lineTypes = ["solid", "dotted", "dashed", "double", "groove", "ridge", "inset", "outset"];

  // Populate dropdown with line type options
  lineTypes.forEach(type => {
      let option = document.createElement('option');
      option.value = type;
      option.textContent = type; // Show line type name
      lineTypeDropdown.appendChild(option);
  });

  // Change line style when selecting a line type
  lineTypeDropdown.addEventListener('change', () => {
      lineElement.style.borderStyle = lineTypeDropdown.value; // Update line style
      section.lineStyle = lineTypeDropdown.value;
  });

  // Append the line element to the line container
  const lineContainer = document.getElementById('line-container');
  lineContainer.appendChild(lineElement);
  lineContainer.appendChild(labelBox);
  lineContainer.appendChild(labelMoveTab);
  lineContainer.appendChild(colorDropdown);
  lineContainer.appendChild(lineTypeDropdown);
  
  const section = new Section(startInd, endInd, labelBox, lineElement, labelMoveTab, color, lineStyle, labelText);
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
  console.log(sections);
  //saveSections(sections);
  //getSections();
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
  let startInd;
  let endInd;
  if (arguments.length == 1) { // Overloading for createSection(seciton) used with section_load.js
    startInd = arguments[0].startInd;
    endInd = arguments[0].endInd;
  } else {
    const range = quill.getSelection();
    //const text = quill.getText(range.index, range.length);
    startInd = range.index;
    endInd = range.index + range.length;
  
  }
  //console.log("StartInd", startInd);
  //console.log("EndInd",endInd);
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

// Refresh entity data before loading in all saved sections
entityData = await window.top.db.get(entityId);
await loadSections(entityData);


// This ensures the editor works as expected.
export { quill };
export { sections };
// Save text when pressing ctrl+s
document.addEventListener("keydown", async (event) => {
  if (!(event.ctrlKey && event.key === ".")) { return; }
  let entityData = await window.top.db.get(entityId);
  getSections(entityData);
});
document.addEventListener("keydown", async (event) => {
  if (!(event.ctrlKey && event.key === "s")) { return; }
  event.preventDefault();
  
  if (!entityId) {
    console.error("No entity ID in URL.");
  } else {
    try {
        let entityData = await window.top.db.get(entityId); // Must refresh entityData or _rev will be outdated 
        saveSections(sections,entityData);
        entityData = await window.top.db.get(entityId); // Must refresh entityData or _rev will be outdated
        saveTextDocument(entityData,JSON.stringify(quill.getContents()));
      } catch (err) {
        console.error("Failed to fetch document:", err);
      }
  }
});

// Adds the ability to tab, but messes with sections so turned off for the moment
// quill.container.addEventListener("keydown", function(event) {
//   if (event.key === "Tab") {
//       event.preventDefault();
//       let range = quill.getSelection();
//       if (range) {
//           quill.insertText(range.index, "\t"); // Insert tab character
//           quill.setSelection(range.index + 1); // Move cursor after tab
//       }
//   }
// });