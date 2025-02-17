(function () {
    const containerSelector = document.currentScript.getAttribute("data-container");
    const characterData = JSON.parse(document.currentScript.getAttribute("data-characterData"));
    const container = document.querySelector(containerSelector);
    const modData = JSON.parse(document.currentScript.getAttribute("data-modData"));


    // Create the outer module element.
    const moduleElem = document.createElement("div");
    moduleElem.classList.add("module", "text-module");
    moduleElem.style.position = "relative"; // Important for absolute positioning of children
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

    // Create and insert the module value element.
    const valueElem = document.createElement("div");
    valueElem.classList.add("module-value");

    // Absolutely position this div at the bottom, 80% tall, full width:
    valueElem.style.position = "absolute";
    valueElem.style.bottom = "0";
    valueElem.style.width = "97%";
    valueElem.style.height = "80%";

    // Enable vertical scrolling. We'll add custom scrollbar styling with <style>:
    valueElem.style.overflowY = "auto";
    valueElem.style.overflowX = "hidden";
    valueElem.style.boxSizing = "border-box"; // helps ensure width calculations work as expected

    // Inject inline CSS to style the scrollbar (WebKit-specific + some standard properties):
    const scrollbarStyle = document.createElement("style");
    scrollbarStyle.textContent = `
    /* For Firefox (thin scrollbar) */
    .module-value {
        scrollbar-width: thin;
        scrollbar-color: #888 #f1f1f1;
    }
    /* For WebKit browsers (Chrome, Safari, etc.) */
    .module-value::-webkit-scrollbar {
        width: 6px;
    }
    .module-value::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    .module-value::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 3px;
    }
    .module-value::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    `;
    
    relationIndex = characterData.modules.findIndex(m => m.type === "relationships");
    changeIndex = characterData.changeIndex
    relationIds = characterData.modules[relationIndex].value[changeIndex];
    document.head.appendChild(scrollbarStyle);
    relationIds.forEach(id => {
        window.top.db.get(id).then(newEntityData => {
            const nameModule = newEntityData.modules.find(m => m.type === "name");
            const name = (nameModule && nameModule.value && nameModule.value[0]) || "no name";

            const itemDiv = document.createElement("div");
            itemDiv.textContent = name;
            itemDiv.style.height = "35px";
            itemDiv.style.width = "100%";
            itemDiv.style.boxSizing = "border-box";
            itemDiv.addEventListener("click", function (e) {
                e.stopPropagation();
                const tabHeader = window.parent.document.getElementById("tab-header");
                const pageWindow = window.parent.document.getElementById("page-window");

                window.parent.addNewTab(name, "../base_page/base_page.html?id=" + encodeURIComponent(id), tabHeader, pageWindow);
            });
            valueElem.appendChild(itemDiv);
        }).catch(err => {
            if (err.name == 'not_found') {
                characterData.modules[relationIndex].value[changeIndex] = relationIds.filter(newId => newId !== id);
                window.top.db.put(characterData);
            }
        })
    });


    valueElem.dataset.saveContent = JSON.stringify(modData.value);

    moduleElem.appendChild(valueElem);

    // Add the transparent overlay for drag detection.
    const dragRegion = document.createElement("div");
    dragRegion.classList.add("module-border-drag-region");
    moduleElem.appendChild(dragRegion);

    // Finally, add the module to the container.
    container.appendChild(moduleElem);


    // Initialize resizing 
    if (typeof initModuleResize === "function") {
        initModuleResize(moduleElem);
      }
    
    if (typeof initializeSnapping === "function") {
    initializeSnapping();
    }
})();
