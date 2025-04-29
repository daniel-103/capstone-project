var resizingModuleData = null;

let otherModules;
// const SNAP_THRESHOLD = 20;
// const GRID_SIZE = 50;

function initModuleResize(moduleElem) {
  moduleElem.addEventListener("mousedown", function(e) {
    var rect = moduleElem.getBoundingClientRect();
    var threshold = 8; // pixels
    var onLeft   = (e.clientX - rect.left) < threshold;
    var onRight  = (rect.right - e.clientX) < threshold;
    var onTop    = (e.clientY - rect.top) < threshold;
    var onBottom = (rect.bottom - e.clientY) < threshold;
    
    

    // If the click is near any border, start resizing.
    if (onLeft || onRight || onTop || onBottom) {
      e.stopPropagation();
      startResizing(moduleElem, rect, e, { onLeft, onRight, onTop, onBottom });
    }
  });

  // Change the cursor style when hovering near a border.
  moduleElem.addEventListener("mousemove", function(e) {
    var rect = moduleElem.getBoundingClientRect();
    var threshold = 8;
    var onLeft   = (e.clientX - rect.left) < threshold;
    var onRight  = (rect.right - e.clientX) < threshold;
    var onTop    = (e.clientY - rect.top) < threshold;
    var onBottom = (rect.bottom - e.clientY) < threshold;
    
    if ((onLeft && onTop) || (onRight && onBottom)) {
      moduleElem.style.cursor = "nwse-resize";
    } else if ((onRight && onTop) || (onLeft && onBottom)) {
      moduleElem.style.cursor = "nesw-resize";
    } else if (onLeft || onRight) {
      moduleElem.style.cursor = "ew-resize";
    } else if (onTop || onBottom) {
      moduleElem.style.cursor = "ns-resize";
    } else {
      moduleElem.style.cursor = "default";
    }

    document.querySelectorAll('.snap-line').forEach(line => line.remove());
    grid.style.mask = '';
  });
}


function startResizing(moduleElem, rect, e, flags) {
  resizingModuleData = {
    module: moduleElem,
    startX: e.clientX,
    startY: e.clientY,
    startWidth: rect.width,
    startHeight: rect.height,
    startLeft: rect.left,
    startTop: rect.top,
    flags: flags,
  };

  // account for some wierd bug that adjusts the width and height by 36 pixels
  resizingModuleData.startWidth -= 32;
  resizingModuleData.startHeight -= 32;

  otherModules = Array.from(document.querySelectorAll(".module")).filter(m => m != moduleElem);
  // console.log(otherModules);
  document.body.style.userSelect = "none";
}


function onModuleResizeMouseMove(e) {
  if (!resizingModuleData) return;
  var data = resizingModuleData;
  var newWidth = data.startWidth;
  var newHeight = data.startHeight;
  var newLeft = data.startLeft;
  var newTop = data.startTop;

  // Adjust horizontally.
  // If not holding ctrl, resized as normal
  if (!e.ctrlKey) {
    if (data.flags.onLeft) {
      newLeft = e.clientX;
      newWidth = (data.startLeft + data.startWidth) - newLeft;
    } else if (data.flags.onRight) {
      newWidth = e.clientX - data.startLeft - 32;
    }
  
    // Adjust vertically.
    if (data.flags.onTop) {
      newTop = e.clientY ;
      newHeight = (data.startTop + data.startHeight) - newTop;
    } else if (data.flags.onBottom) {
      newHeight = e.clientY  - data.startTop - 32;
    }
  } else {
    // Snap
    let lineX = null;
    let lineY = null;

    // Horizontal
    if (data.flags.onLeft || data.flags.onRight) {
      
      // Grid
      let smallestSnapDistanceX = e.clientX - Math.round(e.clientX / GRID_SIZE) * GRID_SIZE
      
      // Other Modules
      for (const otherModule of otherModules) {
        const otherRect = otherModule.getBoundingClientRect();
        const otherPoints = [ otherRect.left, otherRect.left + otherRect.width / 2, otherRect.right ];
        
        for (const otherPoint of otherPoints) {
          const SnapDistanceX = e.clientX - otherPoint;
          if (Math.abs(SnapDistanceX) < Math.abs(smallestSnapDistanceX)) {
            smallestSnapDistanceX = SnapDistanceX;

            lineY = {
              x : otherPoint,
              y1 : newTop + (newHeight + 32)/2,
              y2 : otherRect.top + otherRect.height/2,
            }
          }
        }
      }

      if (Math.abs(smallestSnapDistanceX) < SNAP_THRESHOLD) {
        if (data.flags.onLeft) {
          newLeft = e.clientX - smallestSnapDistanceX;
          newWidth = (data.startLeft + data.startWidth) - newLeft;
        } else if (data.flags.onRight) {
          newWidth = e.clientX - smallestSnapDistanceX - data.startLeft - 32;
        }
      } else {
        // Move normally
        if (data.flags.onLeft) {
          newLeft = e.clientX;
          newWidth = (data.startLeft + data.startWidth) - newLeft;
        } else if (data.flags.onRight) {
          newWidth = e.clientX - data.startLeft - 32;
        }
      }
    } 

    // Vertical
    if (data.flags.onTop || data.flags.onBottom) {
      
      // Grid
      smallestSnapDistanceY = e.clientY - Math.round(e.clientY / GRID_SIZE) * GRID_SIZE
      
      // Other Modules
      for (const otherModule of otherModules) {
        const otherRect = otherModule.getBoundingClientRect();
        const otherPoints = [ otherRect.top, otherRect.top + otherRect.height / 2, otherRect.bottom ];
        
        for (const otherPoint of otherPoints) {
          const SnapDistanceY = e.clientY - otherPoint;
          if (Math.abs(SnapDistanceY) < Math.abs(smallestSnapDistanceY)) {
            smallestSnapDistanceY = SnapDistanceY;

            lineX = {
              y : otherPoint,
              x1 : newLeft + (newWidth + 32)/2,
              x2 : otherRect.left + otherRect.width/2,
            }
          }
        }
      }

      if (Math.abs(smallestSnapDistanceY) < SNAP_THRESHOLD) {
        if (data.flags.onTop) {
          newTop = e.clientY - smallestSnapDistanceY;
          newHeight = (data.startTop + data.startHeight) - newTop;
        } else if (data.flags.onBottom) {
          newHeight = e.clientY - smallestSnapDistanceY - data.startTop - 32;
        }
      } else {
        // Move normally
        if (data.flags.onTop) {
          newTop = e.clientY ;
          newHeight = (data.startTop + data.startHeight) - newTop;
        } else if (data.flags.onBottom) {
          newHeight = e.clientY  - data.startTop - 32;
        }
      }
    }

    if (lineY !== null) {
      const snapLine = document.createElement('div');
      snapLine.classList.add('snap-line');
      snapLine.style.left = `${lineY.x - 1}px`;
      snapLine.style.top = `${Math.min(lineY.y1, lineY.y2)}px`;
      snapLine.style.width = `2px`;
      snapLine.style.height = `${Math.abs(lineY.y1 - lineY.y2)}px`;
      page.appendChild(snapLine);
    }

    if (lineX !== null) {
      const snapLine = document.createElement('div');
      snapLine.classList.add('snap-line');
      snapLine.style.left = `${Math.min(lineX.x1, lineX.x2)}px`;
      snapLine.style.top = `${lineX.y - 1}px`;
      snapLine.style.width = `${Math.abs(lineX.x1 - lineX.x2)}px`;
      snapLine.style.height = `2px`;
      page.appendChild(snapLine);
    }

    grid.style.mask = `radial-gradient(circle ${((newWidth + newHeight)/2) * RADIUS_SCALER + RADIUS_EXTRA}px at ${e.clientX}px ${e.clientY}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)`
  }


  // Enforce minimum dimensions.
  newWidth = Math.max(newWidth, 30);
  newHeight = Math.max(newHeight, 30);

  // Convert absolute position into coordinates relative to the container.
  var container = document.getElementById("page-container");
  var containerRect = container.getBoundingClientRect();
  var relativeLeft = newLeft - containerRect.left;
  var relativeTop = newTop - containerRect.top;
  
  // Apply new dimensions and position.
  if (newWidth > 30) {
    data.module.style.width = newWidth + "px";
    data.module.style.left = relativeLeft + "px";    
  }

  if (newHeight > 30) {
    data.module.style.height = newHeight + "px";
    data.module.style.top = relativeTop + "px";
  }
}


function onModuleResizeMouseUp(e) {
  if (!resizingModuleData) return;
  resizingModuleData = null;
  document.body.style.userSelect = "";
}

document.addEventListener("mousemove", onModuleResizeMouseMove);
document.addEventListener("mouseup", onModuleResizeMouseUp);
