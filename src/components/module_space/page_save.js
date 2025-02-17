export function setupSaveHandler(characterData, db) {
    document.addEventListener("keydown", async (event) => {
      if (!(event.ctrlKey && event.key === "s")) { return; }
      event.preventDefault();
      try {
        const moduleElems = document.querySelectorAll(".module.text-module");
        
        moduleElems.forEach((elem) => {
          const valueElem = elem.querySelector(".module-value");
          const typeElem = elem.querySelector(".module-type");
          const i = characterData.modules.findIndex(mod => mod.type === typeElem.textContent);
          const xPos = parseInt(elem.style.left, 10) || 0;
          const yPos = parseInt(elem.style.top, 10) || 0;
          const width = elem.style.width;
          const height = elem.style.height;
          characterData.modules[i].value[characterData.changeIndex] = valueElem.textContent;
          characterData.modules[i].position.x = xPos;
          characterData.modules[i].position.y = yPos;
          characterData.modules[i].size = { width, height };
            
        });
        const result = await db.put(characterData);
        characterData._rev = result.rev;
      } catch (err) {
        console.error("Error saving document:", err);
      }
    });
  }
  