export let currentZ = 1;

export function displayModules(characterData, containerSelector) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";
  const modulesObj = characterData.modules || {};
  for (const moduleKey in modulesObj) {
    const modData = modulesObj[moduleKey];
    if (!modData) continue;

    // Create the outer module element.
    const moduleElem = document.createElement("div");
    moduleElem.classList.add("module", "text-module");
    moduleElem.style.left = (modData.position.x || 0) + "px";
    moduleElem.style.top = (modData.position.y || 0) + "px";
    moduleElem.dataset.moduleKey = moduleKey;
    moduleElem.style.zIndex = currentZ;
    moduleElem.style.width = modData.size?.width || "200px";
    moduleElem.style.height = modData.size?.height || "100px";


    // Initialize resizing 
    if (typeof initModuleResize === "function") {
      initModuleResize(moduleElem);
    }

    // Bring module to front on click.
    moduleElem.addEventListener("click", function(e) {
      bringToFront(moduleElem);
    });

    // Create and insert module type element.
    const typeElem = document.createElement("div");
    typeElem.classList.add("module-type");
    typeElem.textContent = moduleKey;
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
  }

  if (typeof initializeSnapping === "function") {
    initializeSnapping();
  }
}

export function bringToFront(moduleElem) {
  currentZ++;
  moduleElem.style.zIndex = currentZ;
}
