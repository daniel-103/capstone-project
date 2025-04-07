export const moduleAdd = (entityData, scriptPath, containerSelector) => {
    // Add module to entityData
    const default_module = { type: "1",    value: ["{\"ops\":[{\"insert\":\"\\n\"}]}"],      position: { x: 500, y: 550 }, size: { width: "400px", height: "120px" }, scripts: ['../scripts/richEditorText.js']  };
    default_module.scripts[0] = scriptPath;
    entityData.modules.push(default_module);

    default_module.type = getType(entityData, default_module.type);

    // Add module visually to page
    const scriptElem = document.createElement("script");
    scriptElem.src = scriptPath;
    scriptElem.setAttribute("data-modData", JSON.stringify(default_module));
    scriptElem.setAttribute("data-container", containerSelector);
    scriptElem.setAttribute("data-characterData", JSON.stringify(entityData));

    document.querySelector(containerSelector).appendChild(scriptElem);
}

function getType(entityData, type) {
    if (entityData.modules.findIndex(mod => mod.type === type) == -1) {
        return type
    }
    return getType(entityData, `${parseInt(type)+1}`)
}