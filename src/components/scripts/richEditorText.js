(function () {
    const containerSelector = document.currentScript.getAttribute("data-container");
    const characterData = JSON.parse(document.currentScript.getAttribute("data-characterData"));
    const modData = JSON.parse(document.currentScript.getAttribute("data-modData"));
    const container = document.querySelector(containerSelector);
    const styles = getComputedStyle(window.top.document.documentElement);
  
    // Create the outer module element.
    const moduleElem = document.createElement("div");
    moduleElem.classList.add("module", "text-module", "rich-text");
    moduleElem.style.left = (modData.position.x || 0) + "px";
    moduleElem.style.top = (modData.position.y || 0) + "px";
    // moduleElem.style.backgroundColor = styles.getPropertyValue("--default-page-module-background-color").trim();
    console.log(moduleElem.style.backgroundColor, styles)
    moduleElem.dataset.moduleKey = modData.type;
    moduleElem.style.width = modData.size?.width || "200px";
    moduleElem.style.height = modData.size?.height || "100px";
    moduleElem.dataset.selected = "false";
  
    // Create and insert module type element.
    const typeElem = document.createElement("div");
    typeElem.classList.add("module-type");
    typeElem.textContent = modData.name ? modData.name : modData.type;
    typeElem.dataset.type = modData.type;
    typeElem.contentEditable = "true";
    moduleElem.appendChild(typeElem);
  
    // Create a container for the editor.
    const editorContainer = document.createElement("div");
    editorContainer.classList.add("module-value");
    // Let the editor scroll only if content overflows:
    editorContainer.style.overflowY = "auto";
    editorContainer.style.width = "100%";
    editorContainer.style.height = "100%";
    editorContainer.style.boxSizing = "border-box";
    editorContainer.addEventListener("click", () => {
      moduleElem.classList.remove("selected");
    });
    moduleElem.appendChild(editorContainer);
  
    // Define Quill toolbar options
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ color: [] }, { background: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ font: [] }],
    ];
  
    // Create a div that will host the Quill editor.
    const quillEditorDiv = document.createElement("div");
    quillEditorDiv.classList.add("quill-editor");
    quillEditorDiv.setAttribute("spellcheck", "true");
    // Fill the container
    quillEditorDiv.style.width = "100%";
    quillEditorDiv.style.height = "100%";
    editorContainer.appendChild(quillEditorDiv);
  
    // Initialize Quill on the editor div.
    const quill = new Quill(quillEditorDiv, {
      modules: { toolbar: toolbarOptions },
      theme: "snow"
    });
  
    // Set initial value.
    editorContainer.dataset.saveContent = JSON.stringify(modData.value);
    quill.setContents(JSON.parse(modData.value[characterData.changeIndex]));
    
    // Grab the Quill toolbar.
    const quillToolbar = moduleElem.querySelector(".ql-toolbar");
    if (quillToolbar) {
      // Make it sticky and hidden initially.
      quillToolbar.style.position = "sticky";
      quillToolbar.style.top = "0";
      quillToolbar.style.zIndex = "1000";
      quillToolbar.style.display = "none";
    }
  
    // Show the toolbar when the editor container is clicked.
    editorContainer.addEventListener("click", function (e) {
      if (quillToolbar) quillToolbar.style.display = "block";
      moduleElem.classList.add('editing')
      // e.stopPropagation();
    });
  
    // Hide the toolbar when clicking outside the editor container.
    document.addEventListener("click", function (e) {
      if (!editorContainer.contains(e.target)) {
        if (quillToolbar) quillToolbar.style.display = "none";
        moduleElem.classList.remove('editing');
      }
    });
  
    
    const style = document.createElement("style");
    style.textContent = `
      /* Ensure the editor area doesn't force scrollbars if content is small. */
      .rich-text .module-value {
        box-sizing: border-box;
        overflow-y: none; 
        height: calc(100% - 10px) !important;
      }
  
      .ql-container {
        
        border: none !important;
        height: auto !important;
      }
  
      .ql-editor {
        border: none !important;
        outline: none !important; /* Also removes focus outline */
      }

      .ql-toolbar {
        position: relative !important;
      }
    `;
    
    document.head.appendChild(style);

    // Add the transparent overlay for drag detection (if used).
    const dragRegion = document.createElement("div");
    dragRegion.classList.add("module-border-drag-region");
    moduleElem.appendChild(dragRegion);
  
    quill.on("text-change", () => {
      modData.value[characterData.changeIndex] = JSON.stringify(quill.getContents());
      editorContainer.dataset.saveContent = JSON.stringify(modData.value);
    });
  
  
    // Finally, add the module to the container.
    container.appendChild(moduleElem);
  
    
    // Initialize resizing if the function exists.
    if (typeof initModuleResize === "function") {
      initModuleResize(moduleElem);
    }
    // Initialize snapping if the function exists.
    if (typeof initializeSnapping === "function") {
      initializeSnapping();
    }
  })();
  