
(async function () {
    const containerSelector = document.currentScript.getAttribute("data-container");
    const characterData = JSON.parse(document.currentScript.getAttribute("data-characterData"));
    const container = document.querySelector(containerSelector);
    const modData = JSON.parse(document.currentScript.getAttribute("data-modData"));
    let focusedNode = null;
    console.log(characterData);
    console.log(characterData.parentId);
    const parentData = await window.top.db.get(characterData.parentId);
    console.log(parentData);
    const parentChildren = parentData.childrenIds
    console.log(parentChildren);
    let characters = [];
    //let relations = [['Name','Name'],['Tim','Tom'],['Tim','Tam']];
    let relations = [];
    
    for (let i = 0;i < parentChildren.length;i++) {
        let curr = await window.top.db.get(parentChildren[i]);
        if (curr.fileType == "character") {
            let charName = curr.modules[0].value[0];
            //console.log(curr.module[0]);
            characters.push(charName);
            //console.log(charName);
            //console.log(curr.modules);
            relations.push([charName,charName]);
            if (curr.modules[5].value[0] != "") {
              let charRel = curr.modules[5].value;
              //console.log(charRel);
              charRel.forEach(async relId => {
                let relData = await window.top.db.get(relId[0]);
                //console.log(relData);
                let rels = relData.modules[1].value[0];
                //console.log(rels);
                let a = await window.top.db.get(rels[0]);
                let b = await window.top.db.get(rels[1]);
                
                relations.push([a.modules[0].value[0],b.modules[0].value[0]]);
              });
            }
        }
    };
    console.log(relations);
    characters.forEach((name, index) => {
       
        const nodeGraphModule = document.createElement("div");
        nodeGraphModule.classList.add("module","text-module");
        // Get container dimensions
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;

        // Circular placement:
        const radius = 150; // Distance from center
        const angle = (index / characters.length) * (2 * Math.PI); // Spread evenly in a circle

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        //nodeGraphModule.style.position = "centered";
        nodeGraphModule.style.position = "absolute";
        nodeGraphModule.style.left = `${x}px`;
        nodeGraphModule.style.top = `${y}px`;
        nodeGraphModule.style.height = '50px';
        nodeGraphModule.style.width = '50px';
        nodeGraphModule.dataset.moduleKey = modData.type;
        nodeGraphModule.style.borderRadius = '50%';
        nodeGraphModule.style.backgroundColor = 'rgba(52,52,52,1)'
        nodeGraphModule.style.zIndex = '99';
        nodeGraphModule.dataset.selected = "false";
        nodeGraphModule.style.transition = "opacity 0.3s ease";


        const nodeContent = document.createElement("div");
        nodeContent.classList.add("module-value");
        nodeContent.style.position = "centered";
        nodeContent.textContent = name;
        nodeGraphModule.appendChild(nodeContent);
        // Add the transparent overlay for drag detection.
        const dragRegion = document.createElement("div");
        dragRegion.classList.add("module-border-drag-region");
        nodeGraphModule.appendChild(dragRegion);
        // Create focus button
        const focusBtn = document.createElement("button");
        focusBtn.textContent = "🔍";
        focusBtn.style.position = "absolute";
        focusBtn.style.top = "2px";
        focusBtn.style.right = "2px";
        focusBtn.style.width = "20px";
        focusBtn.style.height = "20px";
        focusBtn.style.borderRadius = "50%";
        focusBtn.style.border = "none";
        focusBtn.style.cursor = "pointer";
        focusBtn.style.fontSize = "12px";
        focusBtn.style.backgroundColor = "#eee";
        focusBtn.style.zIndex = "100";

        focusBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering drag or other stuff
        focusOnNode(name);
        });

        nodeGraphModule.appendChild(focusBtn);


        // Add module to container
        container.appendChild(nodeGraphModule);
        // Inside your characters.forEach(...)
        nodeGraphModule.addEventListener('mousedown', (e) => {
            e.preventDefault();
            let shiftX = e.clientX - nodeGraphModule.getBoundingClientRect().left;
            let shiftY = e.clientY - nodeGraphModule.getBoundingClientRect().top;
        
            function onMouseMove(e) {
                nodeGraphModule.style.left = `${e.clientX - shiftX}px`;
                nodeGraphModule.style.top = `${e.clientY - shiftY}px`;

                const ctx = lineCanvas.getContext('2d');
                ctx.clearRect(0,0, lineCanvas.width, lineCanvas.height);
                // Only redraw lines for the focused node
                if (focusedNode) {
                    relations.forEach(([a, b]) => {
                    if (a === focusedNode || b === focusedNode) {
                        drawLineBetween(a, b);
                    }
                    });
                }
            //redrawAllLines(); // ⬅️ Redraw on move
            }
        
            function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            }
        
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
  
    })
    const lineCanvas = document.createElement("canvas");
    container.appendChild(lineCanvas);
    //drawLineBetween('Tim', 'Tom');
    
    redrawAllLines();
    //focusOnNode('Tim');
    function findElementByText(text) {
        const elements = document.querySelectorAll('div');
        for (let el of elements) {
          if (el.textContent.trim() === text) {
            return el;
          }
        }
        return null;
    }
    function drawLineBetween(text1, text2) {
        const el1 = findElementByText(text1);
        const el2 = findElementByText(text2);
      
        if (!el1 || !el2) {
          console.warn("One or both elements not found");
          return;
        }
      
        //const canvas = container.canvas;
        const ctx = lineCanvas.getContext('2d');
      
        // // Make canvas cover the whole page
        // lineCanvas.width = window.innerWidth;
        // lineCanvas.height = window.innerHeight;
      
        // Get the center positions of the two elements
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();
      
        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 2;
      
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;
      
        // Draw the line
        //ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height); // Optional: clear previous lines
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    function redrawAllLines() {
        const ctx = lineCanvas.getContext('2d');
        lineCanvas.width = window.innerWidth;
        lineCanvas.height = window.innerHeight;
        ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
      
        relations.forEach(([a, b]) => drawLineBetween(a, b));
    }
    function focusOnNode(nodeName) {
        focusedNode = nodeName;

        const ctx = lineCanvas.getContext('2d');
        ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);
      
        // Track which nodes are connected to this node
        const connectedNodes = new Set();
      
        relations.forEach(([a, b]) => {
          if (a === nodeName || b === nodeName) {
            drawLineBetween(a, b);
            connectedNodes.add(a);
            connectedNodes.add(b);
          }
        });
      
        // Loop through all nodes and show/hide based on connection
        document.querySelectorAll(".module.text-module").forEach((nodeEl) => {
        const text = nodeEl.querySelector(".module-value")?.textContent.trim();
        //   if (connectedNodes.has(text)) {
        //     nodeEl.style.display = "block";
        //   } else {
        //     nodeEl.style.display = "none";
        // }
        nodeEl.style.opacity = connectedNodes.has(text) ? "1" : "0.2";

        });
      }
      focusOnNode(characters[0]);
    
    

    // Initialize resizing 
    // if (typeof initModuleResize === "function") {
    //     initModuleResize(nodeGraphModule);
    //   }
    
    if (typeof initializeSnapping === "function") {
    initializeSnapping();
    }
    

})();
