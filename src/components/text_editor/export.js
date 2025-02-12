import { quill } from './text_editor.js';

// window.top.document.getElementById('file-save-as-btn').addEventListener('click', () => {
//   const dropdown = document.getElementById('exportDropdown');
//   dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
// });

const settingsPopup = document.getElementById("exportSettingsPopup");
const settingsContent = document.getElementById("settingsContent");
const exportTitle = document.getElementById("exportSettingsTitle");
const exportConfirm = document.getElementById("exportConfirm");
const exportCancel = document.getElementById("exportCancel");

// Shared settings
let currentFormat = ""; // Tracks the file format (PDF/DOCX)

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

const exportPDF = async (settings) => {
  try {
    const delta = quill.getContents();
    const ops = Array.isArray(delta) ? delta : delta.ops;

    if (ops.length === 0) {
      alert('The text editor is empty. Please write something before exporting.');
      return;
    }

    const pdfDoc = await PDFLib.PDFDocument.create();

    const pageSizeMap = {
      A4: [595.28, 841.89],
      Letter: [612, 792],
      Legal: [612, 1008]
    };

    const pageSize = pageSizeMap[settings.pageSize] || pageSizeMap.A4;
    const orientation = settings.orientation === "landscape" ? [pageSize[1], pageSize[0]] : pageSize;
    const page = pdfDoc.addPage(orientation);

    const margin = settings.margins || 50;
    let y = page.getHeight() - margin;

    const fontSansSerif = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica); // Sans serif
    const fontSansSerifItalic = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaOblique); // Sans serif italic
    const fontSansSerifBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold); // Sans serif bold
    const fontSansSerifBoldItalic = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBoldOblique); // Sans serif bold italic

    const fontSerif = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman); // Serif
    const fontSerifItalic = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRomanItalic); // Serif italic
    const fontSerifBold = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRomanBold); // Serif bold
    const fontSerifBoldItalic = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRomanBoldItalic); // Serif bold italic

    const fontMonospace = await pdfDoc.embedFont(PDFLib.StandardFonts.Courier); // Monospace
    const fontMonospaceItalic = await pdfDoc.embedFont(PDFLib.StandardFonts.CourierOblique); // Monospace italic
    const fontMonospaceBold = await pdfDoc.embedFont(PDFLib.StandardFonts.CourierBold); // Monospace bold
    const fontMonospaceBoldItalic = await pdfDoc.embedFont(PDFLib.StandardFonts.CourierBoldOblique); // Monospace bold italic

    // Font size mapping
    const fontSizeMap = {
      small: 10,
      normal: 12,
      large: 16,
      huge: 24
    };

    // Font family mapping (sans serif, serif, monospace)
    const fontFamilyMap = {
      'sans serif': fontSansSerif,
      'serif': fontSerif,
      'monospace': fontMonospace
    };

    // Helper to wrap text within a line width
    const wrapText = (text, font, fontSize, maxWidth) => {
      // Replace tabs with spaces
      text = text.replace(/\t/g, '    ');
    
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';
    
      words.forEach((word) => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      });
    
      if (currentLine) lines.push(currentLine);
      return lines;
    };

    // Iterate over the delta and render text with styles
    for (const op of ops) {
      if (typeof op.insert === 'string') {
        const lines = op.insert.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          // Get styles for this operation
          const style = op.attributes || {};
          const fontSizeName = style.size ? style.size : 'normal'; // Default to 'normal' if not defined
          const fontSize = fontSizeMap[fontSizeName] || 12; // Use the font size mapping
          
          // Select font family (sans serif, serif, or monospace)
          let font = fontFamilyMap[style.font || 'sans serif']; // Default to 'sans serif' if not defined

          // Adjust for bold and italic styles
          if (style.bold && style.italic) {
            if (font === fontSerif) {
              font = fontSerifBoldItalic; // Bold italic for serif
            } else if (font === fontSansSerif) {
              font = fontSansSerifBoldItalic; // Bold italic for sans serif
            } else if (font === fontMonospace) {
              font = fontMonospaceBoldItalic; // Bold italic for monospace
            }
          } else if (style.bold) {
            if (font === fontSerif) {
              font = fontSerifBold; // Bold for serif
            } else if (font === fontSansSerif) {
              font = fontSansSerifBold; // Bold for sans serif
            } else if (font === fontMonospace) {
              font = fontMonospaceBold; // Bold for monospace
            }
          } else if (style.italic) {
            if (font === fontSerif) {
              font = fontSerifItalic; // Italic for serif
            } else if (font === fontSansSerif) {
              font = fontSansSerifItalic; // Italic for sans serif
            } else if (font === fontMonospace) {
              font = fontMonospaceItalic; // Italic for monospace
            }
          }

          const color = style.color ? hexToRgb(style.color) : PDFLib.rgb(0, 0, 0);

          // Underline
          const underline = style.underline;

          const wrappedLines = wrapText(line, font, fontSize, page.getWidth() - margin * 2);
          for (const wrappedLine of wrappedLines) {
            if (y < margin + fontSize + 5) {
              // Add a new page if the text overflows
              y = page.getHeight() - margin;
              pdfDoc.addPage(orientation);
            }

            // Draw the text
            page.drawText(wrappedLine, {
              x: margin,
              y,
              size: fontSize,
              font,
              color,
            });

            // Handle underline manually (since PDFLib doesn't support underline natively)
            if (underline) {
              const textWidth = font.widthOfTextAtSize(wrappedLine, fontSize);
              page.drawLine({
                start: { x: margin, y: y - 2 },
                end: { x: margin + textWidth, y: y - 2 },
                thickness: 0.5,
                color,
              });
            }

            y -= fontSize + 5;
          }

          // Add spacing between paragraphs
          if (i < lines.length - 1) y -= 10;
        }
      }
    }

    // Save and download the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.pdf';
    link.click();
    console.log('Export as PDF completed.');
  } catch (error) {
    console.error('Error exporting as PDF:', error);
    alert('An error occurred while exporting the document. Please try again.');
  }
};


// Convert hex color to RGB
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return PDFLib.rgb(r / 255, g / 255, b / 255);
};

const exportDOCX = async (settings) => {
  try {
    const delta = quill.getContents();

    if (delta.ops.length === 0) {
      alert('The text editor is empty. Please write something before exporting.');
      return;
    }

    const fontSizeMap = {
      small: 10,
      normal: 12,
      large: 16,
      huge: 24
    };

    const fontFamilyMap = {
      'sans serif': 'Arial',
      'serif': 'Times New Roman',
      'monospace': 'Courier New'
    };

    let paragraphs = [];

    for (const op of delta.ops) {
      if (typeof op.insert === 'string') {
        const lines = op.insert.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          const style = op.attributes || {};
          const fontSizeName = style.size ? style.size : 'normal';
          const fontSize = fontSizeMap[fontSizeName] || 12;
          let fontFamily = fontFamilyMap[style.font || 'sans serif'];

          const textRun = new docx.TextRun({
            text: line,
            font: fontFamily,
            size: fontSize * 2,
            bold: !!style.bold,
            italics: !!style.italic,
            underline: style.underline ? {} : undefined,
          });

          paragraphs.push(new docx.Paragraph({
            children: [textRun],
          }));
        }
      }
    }

    const doc = new docx.Document({
      sections: [{
        properties: {},
        children: paragraphs,
      }],
    });

    const blob = await docx.Packer.toBlob(doc);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.docx';
    link.click();
    console.log('Export as DOCX completed.');
  } catch (error) {
    console.error('Error exporting as DOCX:', error);
    alert('An error occurred while exporting the document. Please try again.');
  }
};


// Event listeners for export buttons
window.top.document.getElementById('file-save-as-pdf-btn').addEventListener('click', () => populatePopupContent("PDF"));
window.top.document.getElementById('file-save-as-docx-btn').addEventListener('click', () => populatePopupContent("DOCX"));

// Confirm export button logic
exportConfirm.addEventListener('click', () => {
  const settings = {};

  if (currentFormat === "PDF") {
    settings.pageSize = document.getElementById("pageSize").value;
    settings.orientation = document.getElementById("orientation").value;
    settings.margins = parseInt(document.getElementById("margins").value, 10);
    exportPDF(settings);
  } else if (currentFormat === "DOCX") {
    settings.includeTOC = document.getElementById("includeTOC").checked;
    settings.includeHeaderFooter = document.getElementById("includeHeaderFooter").checked;
    settings.orientation = "portrait"; // You can expand this for DOCX orientation if needed
    exportDOCX(settings);
  }

  settingsPopup.style.display = "none";
});

// Close popup
exportCancel.addEventListener('click', () => {
  settingsPopup.style.display = "none";
});

window.top.document.getElementById('file-save-as-txt-btn').addEventListener('click', async () => {
  try {
    const delta = quill.getContents(); // Get Quill delta (text + formatting)

    if (delta.ops.length === 0) {
      alert('The text editor is empty. Please write something before exporting.');
      return;
    }

    let textContent = '';

    // Iterate over the delta and extract text
    for (const op of delta.ops) {
      if (typeof op.insert === 'string') {
        textContent += op.insert;
      }
    }

    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.txt';
    link.click();
    console.log('Export as TXT completed.');
  } catch (error) {
    console.error('Error exporting as TXT:', error);
    alert('An error occurred while exporting the document. Please try again.');
  }
});

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
