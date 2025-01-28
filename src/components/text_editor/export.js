import { quill } from './text_editor.js';

document.getElementById('exportButton').addEventListener('click', () => {
  const dropdown = document.getElementById('exportDropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('exportPDF').addEventListener('click', async () => {
  try {
    const delta = quill.getContents(); // Get Quill delta (text + formatting)

    if (delta.ops.length === 0) {
      alert('The text editor is empty. Please write something before exporting.');
      return;
    }

    // Initialize PDFLib and create a new PDF document
    const pdfDoc = await PDFLib.PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();
    const margin = 50;
    let y = pageHeight - margin;

    const fontRegular = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica); // Sans serif
    const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold); // Bold sans serif
    const fontItalic = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRomanItalic); // Serif italic
    const fontBoldItalic = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRomanBoldItalic); // Bold serif
    const fontMonospace = await pdfDoc.embedFont(PDFLib.StandardFonts.Courier); // Monospace
    const fontSerif = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman); // Regular serif

    // Font size mapping
    const fontSizeMap = {
      small: 10,
      normal: 12,
      large: 16,
      huge: 24
    };

    // Font family mapping (sans serif, serif, monospace)
    const fontFamilyMap = {
      'sans serif': fontRegular,
      'serif': fontSerif,
      'monospace': fontMonospace
    };

    // Helper to wrap text within a line width
    const wrapText = (text, font, fontSize, maxWidth) => {
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
    for (const op of delta.ops) {
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
              font = fontBoldItalic; // Bold italic for serif
            } else {
              font = fontBold; // Bold for non-serif
            }
          } else if (style.bold) {
            font = fontBold; // Apply bold
          } else if (style.italic) {
            if (font === fontSerif) {
              font = fontItalic; // Italic for serif
            } else {
              font = fontRegular; // Regular for non-serif (no italic)
            }
          }

          const color = style.color ? hexToRgb(style.color) : PDFLib.rgb(0, 0, 0);

          // Underline
          const underline = style.underline;

          const wrappedLines = wrapText(line, font, fontSize, pageWidth - margin * 2);
          for (const wrappedLine of wrappedLines) {
            if (y < margin + fontSize + 5) {
              // Add a new page if the text overflows
              y = pageHeight - margin;
              pdfDoc.addPage([595.28, 841.89]);
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
});


// Convert hex color to RGB
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return PDFLib.rgb(r / 255, g / 255, b / 255);
};

document.getElementById('exportDOCX').addEventListener('click', async () => {
  try {
    const delta = quill.getContents(); // Get Quill delta (text + formatting)

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
      'sans serif': 'Arial', // Sans-serif font
      'serif': 'Times New Roman', // Serif font
      'monospace': 'Courier New' // Monospace font
    };

    let paragraphs = [];

    // Iterate over the delta and render text with styles
    for (const op of delta.ops) {
      if (typeof op.insert === 'string') {
        const lines = op.insert.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];

          // Get styles for this operation
          const style = op.attributes || {};
          const fontSizeName = style.size ? style.size : 'normal'; // Default to 'normal' if not defined
          const fontSize = fontSizeMap[fontSizeName] || 12; // Use the font size mapping
          
          // Select font family (sans serif, serif, or monospace)
          let fontFamily = fontFamilyMap[style.font || 'sans serif']; // Default to 'sans serif' if not defined

          // Create a paragraph with the appropriate styles
          const paragraph = new docx.Paragraph({
            children: [
              new docx.TextRun({
                text: line,
                font: fontFamily,
                size: fontSize * 2, // DOCX uses 1/2 pt for font size, so multiply by 2
                bold: style.bold,
                italics: style.italic,
                underline: style.underline,
              }),
            ],
          });

          paragraphs.push(paragraph);
        }
      }
    }

    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
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
});


document.getElementById('exportTXT').addEventListener('click', async () => {
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
