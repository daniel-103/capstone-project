export let currentZ = 1;

export function displayModules(characterData, containerSelector) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";
  const modules = characterData.modules || [];
  modules.forEach(modData => {

      
      modData.scripts.forEach(script => {
        const scriptElem = document.createElement("script");
        scriptElem.src = script;
        scriptElem.setAttribute("data-modData", JSON.stringify(modData));
        scriptElem.setAttribute("data-container", containerSelector);
        scriptElem.setAttribute("data-characterData", JSON.stringify(characterData));
        
        document.querySelector(containerSelector).appendChild(scriptElem);
      });

  });
  
}

export function bringToFront(moduleElem) {
  currentZ++;
  moduleElem.style.zIndex = currentZ;
}
