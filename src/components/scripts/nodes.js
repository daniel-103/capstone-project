(async function () {
    const containerSelector = document.currentScript.getAttribute("data-container");
    const characterData = JSON.parse(document.currentScript.getAttribute("data-characterData"));
    const container = document.querySelector(containerSelector);
    const modData = JSON.parse(document.currentScript.getAttribute("data-modData"));
    console.log(characterData.parentId);
    const parentData = await window.top.db.get(characterData.parentId);
    console.log(parentData);
    const parentChildren = parentData.childrenIds
    console.log(parentChildren);
    let characters = [];
    for (let i = 0;i < parentChildren.length;i++) {
        let curr = await window.top.db.get(parentChildren[i]);
        if (curr.fileType == "character") {
            //console.log(curr.module[0]);
            characters.push(curr.modules[0].value[0])
            console.log(curr.modules[0].value[0]);
        }
    };
    characters.forEach(name => {
        const nodeGraphModule = document.createElement("div");
        nodeGraphModule.classList.add("module","text-module");
        //nodeGraphModule.style.position = "centered";
        nodeGraphModule.style.position = "absolute";
        nodeGraphModule.style.left = window.innerWidth /2;
        nodeGraphModule.style.top = window.innerHeight/2;
        nodeGraphModule.dataset.moduleKey = modData.type;
        nodeGraphModule.style.height = '50px';
        nodeGraphModule.style.width = '50px';
        nodeGraphModule.style.borderRadius = '50%';
        nodeGraphModule.style.backgroundColor = 'rgba(52,52,52,1)'
        nodeGraphModule.style.zIndex = '99';
        nodeGraphModule.dataset.selected = "false";

        const nodeContent = document.createElement("div");
        nodeContent.classList.add("module-value");
        nodeContent.style.position = "centered";
        nodeContent.textContent = name;
        nodeGraphModule.appendChild(nodeContent);
        // Add the transparent overlay for drag detection.
        const dragRegion = document.createElement("div");
        dragRegion.classList.add("module-border-drag-region");
        nodeGraphModule.appendChild(dragRegion);

        // Add module to container
        container.appendChild(nodeGraphModule);
    })
    
    
    // // Create the outer module element.
    // const nodeGraphModule = document.createElement("div");
    // nodeGraphModule.classList.add("module");
    // //nodeGraphModule.classList.add("module-value");
    // nodeGraphModule.style.position = "relative";
    // nodeGraphModule.style.left = (modData.position.x || 0) + "px";
    // nodeGraphModule.style.top = (modData.position.y || 0) + "px";
    // nodeGraphModule.dataset.moduleKey = modData.type;
    // nodeGraphModule.style.height = '90vh';
    // nodeGraphModule.style.width = '150vh';
    // nodeGraphModule.style.background = 'rgba(207, 22, 22, .5)';
    // //nodeGraphModule.style.borderRadius = '50%';
    // nodeGraphModule.dataset.selected = "false";


    

    //nodeModule.textContent = "Name";
    //nodeGraphModule.appendChild(nodeModule);
    // nodeContent.style.height = '50px';
    // nodeContent.style.width = '50px';
    // nodeContent.style.backgroundColor = '52, 52, 52';
    // nodeContent.style.borderRadius = '50%';







    // // Create and insert the module value element.
    // const valueElem = document.createElement("div");
    // valueElem.classList.add("module-value");

    // const typeElem = document.createElement("div");

    //
    //valueElem.dataset.saveContent = JSON.stringify(modData.value);


    

    // Initialize resizing 
    // if (typeof initModuleResize === "function") {
    //     initModuleResize(nodeGraphModule);
    //   }
    
    if (typeof initializeSnapping === "function") {
    initializeSnapping();
    }

})();
