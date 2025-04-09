(function () {
    const containerSelector = document.currentScript.getAttribute("data-container");
    const entityData = JSON.parse(document.currentScript.getAttribute("data-characterData"));
    const container = document.querySelector(containerSelector);
    const modData = JSON.parse(document.currentScript.getAttribute("data-modData"));
    console.log(entityData);
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
    document.head.appendChild(scrollbarStyle);
    entityIds = entityData.modules[1].value[entityData.changeIndex];
    [...new Set(entityIds)].forEach(id => {
        window.top.db.get(id).then(newEntityData => {
            
            const relationshipModule = newEntityData.modules.find(m => m.type === "relationships");

            if (!(relationshipModule.value[0].includes(entityData._id))) return;

            const itemDiv = getItemDiv(id, newEntityData);

            valueElem.appendChild(itemDiv);

        }).catch(err => {
            if (err.name == 'not_found') {
                entityData.modules[1].value[entityData.changeIndex] = entityIds.filter(newId => newId !== id);
                window.top.db.put(entityData);
            }
        })
    })

    const getItemDiv = (id, newEntityData) => {
      const nameModule = newEntityData.modules.find(m => m.type === "name");
      const name = (nameModule && nameModule.value && nameModule.value[0]) || "no name";
      const relationshipModule = newEntityData.modules.find(m => m.type === "relationships");
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
          entityData.modules[1].value[0] = entityIds.filter(newId => newId !== id);
          relationshipModule.value[0] = relationshipModule.value.filter(newId => newId !== entityData._id);
          window.top.db.put(entityData);
          window.top.db.put(newEntityData);
          itemDiv.remove();
      });

      itemDiv.appendChild(deleteButton);

      itemDiv.addEventListener("click", function (e) {
          e.stopPropagation();
          const tabHeader = window.parent.document.getElementById("tab-header");
          const pageWindow = window.parent.document.getElementById("page-window");

          window.parent.addNewTab(name, "../base_page/base_page.html?id=" + encodeURIComponent(id), tabHeader, pageWindow);
      });

      return itemDiv;
    }

    const newEntityDiv = document.createElement("div");
    newEntityDiv.textContent = "Add Entity";
    newEntityDiv.style.cssText = `
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
    newEntityDiv.onmouseover = () => {
      newEntityDiv.style.backgroundColor = "rgb(110, 110, 110)";
      newEntityDiv.style.color = "black";
    };
      
    newEntityDiv.onmouseout = () => {
      newEntityDiv.style.backgroundColor = "rgb(52, 52, 52)";
      newEntityDiv.style.color = "white";
    };

    newEntityDiv.addEventListener("click", function (e) {
        e.stopPropagation();
        // Prevent multiple dropdowns.
        if (document.querySelector(".entity-dropdown")) return;
      
        // Create dropdown container.
        const dropdown = document.createElement("div");
        dropdown.className = "entity-dropdown";
        Object.assign(dropdown.style, {
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          background: "#fff",
          border: "1px solid #ccc",
          zIndex: "1000",
          boxSizing: "border-box"
        });
      
        // Create search input.
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Type entity name...";
        Object.assign(input.style, {
          width: "100%",
          boxSizing: "border-box"
        });
        dropdown.appendChild(input);
      
        // Create suggestion container.
        const suggestionContainer = document.createElement("div");
        Object.assign(suggestionContainer.style, {
          maxHeight: "150px",
          overflowY: "auto"
        });
        dropdown.appendChild(suggestionContainer);
      
        // Append dropdown into the same container as the "Add Entity" div.
        newEntityDiv.parentNode.appendChild(dropdown);
        

        window.top.db.find({
          selector: { parentId: entityData.parentId, type: "file", fileType: "character" },
        }).then(result => {
          
          const candidates = result;
          // Updates the suggestions based on the current input value.
          const updateSuggestions = () => {
            suggestionContainer.innerHTML = "";
            const term = input.value.trim().toLowerCase();
            let filtered = candidates;
            filtered = candidates.filter(doc => {
              const nameModule = doc.modules.find(m => m.type === "name");
              const relationshipIds = doc.modules.find(m => m.type === "relationships");
              return nameModule && nameModule.value[0].toLowerCase().includes(term) && !relationshipIds.value[0].includes(entityData._id);
            });
            const suggestions = term ? filtered : filtered.slice(0, 5);
            suggestions.forEach(doc => {
              const name = doc.modules.find(m => m.type === "name").value[0];
              const suggestionItem = document.createElement("div");
              suggestionItem.textContent = name;
              Object.assign(suggestionItem.style, {
                padding: "5px",
                cursor: "pointer"
              });
              suggestionItem.addEventListener("click", () => selectCandidate(doc));
              suggestionContainer.appendChild(suggestionItem);
            });
          };
      
          // When a candidate is selected, update the entities module.
          const selectCandidate = (doc) => {
            const name = doc.modules.find(m => m.type === "name").value[0];
            modData.value.push(doc._id);
            const newItem = getItemDiv(doc._id, doc);
            
            valueElem.insertBefore(newItem, newEntityDiv);
            closeDropdown();

            modData.value[entityData.changeIndex].push(doc._id);
            valueElem.dataset.saveContent = JSON.stringify(modData.value);
            relationIndex = doc.modules.findIndex(m => m.type === "relationships");
            doc.modules[relationIndex].value[0].push(entityData._id);
            window.top.db.put(doc);
            
          };
      
          // Close and remove the dropdown.
          const closeDropdown = () => {
            if (dropdown.parentNode) {
              dropdown.parentNode.removeChild(dropdown);
            }
            document.removeEventListener("click", outsideClickListener);
          };

          const saveCharacter = (doc) => {

          }
      
          // If the user clicks outside the dropdown, close it.
          const outsideClickListener = (ev) => {
            if (!dropdown.contains(ev.target) && ev.target !== newEntityDiv) {
              closeDropdown();
            }
          };
          document.addEventListener("click", outsideClickListener);
      
          // Update suggestions on each keystroke.
          input.addEventListener("input", updateSuggestions);
      
          // When user presses Enter, choose the first suggestion.
          input.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              if (suggestionContainer.firstChild) {
                // Find candidate matching the first suggestion.
                const firstName = suggestionContainer.firstChild.textContent;
                const candidate = candidates.find(doc => {
                  const nameModule = doc.modules.find(m => m.type === "name");
                  return nameModule && nameModule.value[0] === firstName;
                });
                if (candidate) {
                    selectCandidate(candidate);
                } 
              }
            }
          });
      
          // Initialize suggestions.
          updateSuggestions();
        
        }).catch(err => {
          console.error("Error fetching characters:", err);
        });
      });
      
    


    valueElem.appendChild(newEntityDiv);

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
