// ========================
// UTIL: exportUtils.js
// Description: Document export functionality
// ========================

import { saveAs } from 'file-saver';
import html2pdf from 'html2pdf.js';
import HTMLtoDOCX from 'html-to-docx';

// ==== PDF Export ====
export const exportToPdf = async (content, filename) => {
  // Create a styled wrapper for the content
  const wrappedContent = `
    <div style="padding: 2cm; font-family: 'Arial', sans-serif;">
      ${content}
    </div>
  `;
  
  // PDF options
  const options = {
    margin: 1,
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
  };
  
  // Generate PDF
  return html2pdf().from(wrappedContent).set(options).save();
};

// ==== DOCX Export ====
export const exportToDocx = async (content, filename) => {
  try {
    // Convert HTML to DOCX buffer
    const docxBuffer = await HTMLtoDOCX(content, null, {
      title: filename,
      margins: {
        top: 1440, // 1 inch in twips
        right: 1440,
        bottom: 1440,
        left: 1440
      },
    });
    
    // Save the file
    saveAs(new Blob([docxBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), `${filename}.docx`);
  } catch (error) {
    console.error('DOCX export error:', error);
    throw error;
  }
};

// ==== Text Export ====
export const exportToTxt = (content, filename) => {
  // Convert HTML to plain text
  const tempElement = document.createElement('div');
  tempElement.innerHTML = content;
  const plainText = tempElement.textContent || tempElement.innerText || '';
  
  // Save the text file
  const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, `${filename}.txt`);
};

// ==== HTML Export ====
export const exportToHtml = (content, filename) => {
  // Create a full HTML document
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${filename}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 2cm; }
        img { max-width: 100%; }
      </style>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `;
  
  // Save the HTML file
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  saveAs(blob, `${filename}.html`);
};