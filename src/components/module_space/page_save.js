export function setupSaveHandler(characterData, db) {
    document.addEventListener("keydown", async (event) => {
      if (!(event.ctrlKey && event.key === "s")) { return; }
      event.preventDefault();
      try {
        const moduleElems = document.querySelectorAll(".module.text-module");
        
        moduleElems.forEach(elem => {
          
          const key = elem.dataset.moduleKey;
          const valueElem = elem.querySelector(".module-value");
          const xPos = parseInt(elem.style.left, 10) || 0;
          const yPos = parseInt(elem.style.top, 10) || 0;
          const width = elem.style.width;
          const height = elem.style.height;
          
          if (characterData.modules[key]) {
            characterData.modules[key].value[characterData.changeIndex] = valueElem.textContent;
            characterData.modules[key].position.x = xPos;
            characterData.modules[key].position.y = yPos;
            characterData.modules[key].size = { width, height };
            
          }
        });
        const result = await db.put(characterData);
        characterData._rev = result.rev;
      } catch (err) {
        console.error("Error saving document:", err);
      }
    });
  }
  