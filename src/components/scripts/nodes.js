(async function () {
    const containerSelector = document.currentScript.getAttribute("data-container");
    const characterData = JSON.parse(document.currentScript.getAttribute("data-characterData"));
    console.log(characterData);
    const container = document.querySelector(containerSelector);
    const modData = JSON.parse(document.currentScript.getAttribute("data-modData"));
    
    const test1 = characterData.parentId;
    const test = await window.top.db.get(test1);
    console.log(test);
    // Create the outer module element.
    let i = 0;
    while(i < 2) {

        const nodeModule = document.createElement("div");
        nodeModule.classList.add("module", "text-module");
        //nodeModule.classList.add("module-value");
        nodeModule.style.position = "relative";
        nodeModule.style.left = (modData.position.x || 0) + "px";
        nodeModule.style.top = (modData.position.y || 0) + "px";
        nodeModule.dataset.moduleKey = modData.type;
        nodeModule.style.height = '50px';
        nodeModule.style.width = '50px';
        // nodeModule.style.backgroundColor = '52, 52, 52';
        nodeModule.style.borderRadius = '50%';
        nodeModule.dataset.selected = "false";
    
        const nodeContent = document.createElement("div");
        nodeContent.classList.add("module-value");
        nodeContent.style.position = "centered";
        nodeContent.textContent = "Name";
        nodeModule.appendChild(nodeContent);
        // nodeContent.style.height = '50px';
        // nodeContent.style.width = '50px';
        // nodeContent.style.backgroundColor = '52, 52, 52';
        // nodeContent.style.borderRadius = '50%';
    
    
    
    
    
    
    
        // // Create and insert the module value element.
        // const valueElem = document.createElement("div");
        // valueElem.classList.add("module-value");
    
        // const typeElem = document.createElement("div");
    
        //
        //valueElem.dataset.saveContent = JSON.stringify(modData.value);
    
    
        // Add the transparent overlay for drag detection.
        const dragRegion = document.createElement("div");
        dragRegion.classList.add("module-border-drag-region");
        nodeModule.appendChild(dragRegion);
    
        // Add module to container
        container.appendChild(nodeModule);
    
        // Initialize resizing 
        // if (typeof initModuleResize === "function") {
        //     initModuleResize(nodeModule);
        //   }
        
        if (typeof initializeSnapping === "function") {
        initializeSnapping();
        }
        i++;
    }

})();
