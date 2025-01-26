document.getElementById('exportButton').addEventListener('click', () => {
  const dropdown = document.getElementById('exportDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('exportPDF').addEventListener('click', async () => {
  // Add functionality to export as PDF
  const textContent = getEditorContent();
  
  if (!textContent.trim()) {
    alert('The text editor is empty. Please write something before exporting.');
    return;
  }

  const pdfDoc = await PDFLib.PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);

  const margin = 50;
  const fontSize = 12;
  const lines = textContent.split('\n');
  let y = page.getHeight() - margin;

  for (const line of lines) {
    if (y < margin) {
      pdfDoc.addPage([595.28, 841.89]);
      y = page.getHeight() - margin;
    }
    page.drawText(line, { x: margin, y, size: fontSize, font, color: PDFLib.rgb(0, 0, 0) });
    y -= fontSize + 5;
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = ' ';
  link.click();
  console.log('Export as PDF');
});

document.getElementById('exportDOCX').addEventListener('click', async () => {
  // Add functionality to export as DOCX
  const textContent = getEditorContent();

  if (!textContent.trim()) {
    alert('The text editor is empty. Please write something before exporting.');
    return;
  }

  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: textContent.split('\n').map(line => new docx.Paragraph(line)),
      },
    ],
  });

  const blob = await docx.Packer.toBlob(doc);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = ' '; 
  link.click();
  console.log('Export as DOCX');
});

document.getElementById('exportTXT').addEventListener('click', () => {
  // Add functionality to export as TXT
  const textContent = getEditorContent();

  if (!textContent.trim()) {
    alert('The text editor is empty. Please write something before exporting.');
    return;
  }
  
  const blob = new Blob([textContent], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = ' '; 
  link.click();
  console.log('Export as TXT');
});

// Function to get the HTML content of the p element within the editor-container
function getEditorContent() {
    const editorContainer = document.getElementById('editor-container');
    const pElement = editorContainer.querySelector('p');
    return pElement ? pElement.innerHTML : '';
  }

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('#exportButton')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.style.display === 'block') {
        openDropdown.style.display = 'none';
      }
    }
  }
}
