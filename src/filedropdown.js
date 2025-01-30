document.getElementById('fileButton').addEventListener('click', () => {
    const dropdown = document.getElementById('fileDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    
    // Populate the dropdown with the "Export" button if not already populated
    if (!dropdown.innerHTML.trim()) {
      dropdown.innerHTML = `
        <button id="exportButton">Export</button>
        <div id="exportDropdown" class="dropdown-content" style="display: none;">
          <a href="#" id="exportPDF">PDF</a>
          <a href="#" id="exportDOCX">DOCX</a>
          <a href="#" id="exportTXT">TXT</a>
        </div>
      `;
      
      // Add event listener for the "Export" button
      document.getElementById('exportButton').addEventListener('click', () => {
        const exportDropdown = document.getElementById('exportDropdown');
        exportDropdown.style.display = exportDropdown.style.display === 'block' ? 'none' : 'block';
      });
    }
});