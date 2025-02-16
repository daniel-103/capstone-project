(function () {
    const containerSelector = document.currentScript.getAttribute("data-container");
    const characterData = JSON.parse(document.currentScript.getAttribute("data-characterData"));
    const container = document.querySelector(containerSelector);
    const modData = JSON.parse(document.currentScript.getAttribute("data-modData"));

    // Create the outer module element.
    const moduleElem = document.createElement("div");
    moduleElem.classList.add("module", "text-module");
    moduleElem.style.left = (modData.position.x || 0) + "px";
    moduleElem.style.top = (modData.position.y || 0) + "px";
    moduleElem.dataset.moduleKey = modData.type;
    moduleElem.style.width = modData.size?.width || "200px";
    moduleElem.style.height = modData.size?.height || "100px";
    
    // Create and insert module type element.
    const typeElem = document.createElement("div");
    typeElem.classList.add("module-type");
    typeElem.textContent = modData.type;
    moduleElem.appendChild(typeElem);

    // Create and insert the module value element
    const valueElem = document.createElement("div");
    valueElem.classList.add("module-value");
    valueElem.contentEditable = "true";
    const changeIndex = characterData.changeIndex || 0;
    valueElem.textContent = (modData.value && modData.value[changeIndex]) || "";
    moduleElem.appendChild(valueElem);

    // Add the transparent overlay for drag detection.
    const dragRegion = document.createElement("div");
    dragRegion.classList.add("module-border-drag-region");
    moduleElem.appendChild(dragRegion);

    container.appendChild(moduleElem);

    // Initialize resizing 
    if (typeof initModuleResize === "function") {
        initModuleResize(moduleElem);
      }
    
    if (typeof initializeSnapping === "function") {
    initializeSnapping();
    }

})();
