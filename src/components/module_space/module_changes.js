import { displayModules, bringToFront, currentZ } from "../module_space/modules_display.js";
export function displayChangesPanel(characterData) {
    const dropdownHeader = document.getElementById("dropdown-header");
    const optionsContainer = document.getElementById("changes-options");
    
    const currentIndex = characterData.changeIndex || 0;
    const currentName = characterData.changes[currentIndex];
    dropdownHeader.innerHTML = currentName + ' &#9662;';
  
    dropdownHeader.onclick = function(e) {
      optionsContainer.style.display = optionsContainer.style.display === "block" ? "none" : "block";
      e.stopPropagation();
    };
  
    optionsContainer.innerHTML = "";
    characterData.changes.forEach((changeName, index) => {
      const option = document.createElement("div");
      option.classList.add("change-option");
      
      const optionText = document.createElement("span");
      optionText.textContent = changeName;
      optionText.contentEditable = "true";
      optionText.style.fontWeight = (currentIndex === index) ? "bold" : "normal";
      optionText.addEventListener("blur", () => {
        const newName = optionText.textContent.trim();
        if(newName.length === 0) {
          optionText.textContent = changeName;
        } else {
          characterData.changes[index] = newName;
          if (currentIndex === index) {
            dropdownHeader.innerHTML = newName + ' &#9662;';
          }
        }
      });
      optionText.addEventListener("click", () => {
        characterData.changeIndex = index;
        // When a change is selected, refresh the module display.
        displayModules(characterData, "#page-container");
        displayChangesPanel(characterData);
      });
      option.appendChild(optionText);
  
      // Add a delete button 
      if (index !== 0) {
        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = " x";
        deleteBtn.classList.add("delete-change");
        deleteBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          deleteChange(characterData, index);
        });
        option.appendChild(deleteBtn);
      }
      optionsContainer.appendChild(option);
    });
  
    // Add the plus button.
    const addBtn = document.createElement("button");
    addBtn.id = "add-change";
    addBtn.textContent = "+";
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      addNewChange(characterData);
    });
    optionsContainer.appendChild(addBtn);
  }
  
  export function deleteChange(characterData, index) {
    if (index === 0) return;
    characterData.changes.splice(index, 1);
    Object.keys(characterData.modules).forEach(key => {
      if (Array.isArray(characterData.modules[key].value)) {
        characterData.modules[key].value.splice(index, 1);
      }
    });
    if (characterData.changeIndex >= characterData.changes.length) {
      characterData.changeIndex = 0;
    }
    displayModules(characterData, "#page-container");
    displayChangesPanel(characterData);
  }
  
  export function addNewChange(characterData) {
    const currentIndex = characterData.changeIndex || 0;
    const newIndex = currentIndex + 1;
    const newChangeName = "Chapter " + (newIndex + 1);
    characterData.changes.splice(newIndex, 0, newChangeName);
    characterData.modules.forEach(mod => {
      if (Array.isArray(mod.value)) {
        const currentVal = mod.value[currentIndex] || "";
        mod.value.splice(newIndex, 0, currentVal);
      } else {
        mod.value = [mod.value, mod.value];
      }
    });
    characterData.changeIndex = newIndex;
    displayModules(characterData, "#page-container");
    displayChangesPanel(characterData);
  }
  