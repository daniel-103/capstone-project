var resizingModuleData = null;


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
  resizingModuleData.startWidth -= 36;
  resizingModuleData.startHeight -= 36;
}


function onModuleResizeMouseMove(e) {
  if (!resizingModuleData) return;
  var data = resizingModuleData;
  var newWidth = data.startWidth;
  var newHeight = data.startHeight;
  var newLeft = data.startLeft;
  var newTop = data.startTop;

  // Adjust horizontally.
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
}

document.addEventListener("mousemove", onModuleResizeMouseMove);
document.addEventListener("mouseup", onModuleResizeMouseUp);
