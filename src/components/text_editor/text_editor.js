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
  
  ['clean']                                         // remove formatting button
  
];


const quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});

const Inline = Quill.import('blots/inline');

class BoxBlot extends Inline {
  static create(value) {
    let node = super.create(value);
    node.classList.add('ql-box');  // Add the 'ql-box' class to apply styling
    node.style.border = '2px solid #000'; // Black border
    node.style.padding = '2px 4px';       // Padding to create space around the text
    node.style.backgroundColor = '#f0f0f0'; // Light background color
    node.style.borderRadius = '4px';      // Optional: Rounded corners
    node.style.zIndex = '99';
    return node;
  }

  static formats(domNode) {
    return domNode.style.border === '2px solid #000'; // Check if it's a box
  }
}

Quill.register('formats/box',BoxBlot);


const onClick = (selector, callback) => {
  document.querySelector(selector).addEventListener('click', callback);
};

var toolbar = quill.getModule('toolbar');
var sectionbtn = document.createElement('button');
sectionbtn.innerText = 'C';  // Set the letter C
sectionbtn.classList.add('ql-sectionbtn');  // Add class for styling if needed
toolbar.container.appendChild(sectionbtn);
onClick('.ql-sectionbtn', () => {
  

    const range = quill.getSelection();
    const text = quill.getText(range.index, range.length);
    console.log(text);
    quill.formatText(range.index, range.length, 'box', true);
    quill.update();
  
});



// This ensures the editor works as expected.
export { quill };


