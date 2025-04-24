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
    moduleElem.dataset.selected = "false";

    // Create and insert module type element.
    const typeElem = document.createElement("div");
    typeElem.classList.add("module-type");
    typeElem.textContent = modData.name ? modData.name : modData.type;
    typeElem.dataset.type = modData.type;
    typeElem.contentEditable = "true";
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
    [...new Set(relationIds)].forEach(id => {
        window.top.db.get(id).then(relationData => {
            const nameModule = relationData.modules.find(m => m.type === "name");
            const name = (nameModule && nameModule.value && nameModule.value[0]) || "no name";
            const characterModule = relationData.modules.find(m => m.type === "entities");

            if (!(characterModule.value[0].includes(characterData._id))) return;

            const itemDiv = document.createElement("div");
            itemDiv.textContent = name;
            itemDiv.style.cssText = `
                height: 35px;
                width: 95%;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 10px;
                cursor: pointer;
                background-color: rgb(52, 52, 52);
                color: white;
                transition: background-color 0.3s, color 0.3s;
                border-radius: 10px;
            `;
            itemDiv.onmouseover = () => {
                itemDiv.style.backgroundColor = "rgb(110, 110, 110)";
                itemDiv.style.color = "black";
            };
              
            itemDiv.onmouseout = () => {
                itemDiv.style.backgroundColor = "rgb(52, 52, 52)";
                itemDiv.style.color = "white";
            };

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.style.cssText = `
                background: transparent;
                border: none;
                color: rgb(178, 178, 178);
                font-size: 16px;
                cursor: pointer;
            `;
            deleteButton.onmouseover = () => {
                itemDiv.style.backgroundColor = "rgb(255, 0, 0)";
            };

            deleteButton.onmouseout = () => {
                itemDiv.style.backgroundColor = "rgb(178, 178, 178)";
            };

            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();
                characterData.modules[relationIndex].value[changeIndex] = relationIds.filter(newId => newId !== id);
                characterModule.value[0] = characterModule.value.filter(newId => newId !== characterData._id);
                window.top.db.put(characterData);
                window.top.db.put(relationData);
                itemDiv.remove();
            });
              
            itemDiv.appendChild(deleteButton);

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
