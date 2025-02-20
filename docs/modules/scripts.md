## Overview
Scripts are the method that controls the functionality for each module. When you attach a script to a module, the script is invoked when the module is contructed and displayed on the page, and the script defines what is displayed in the module. Due to this modularization, we can add just about any functionality we want to any module we want.

## Script Format
Each script should be in a separate .js file in the scripts folder. Even though these scripts will be attached to its own specific module, the script and module still exist within the context of the current iframe. To scripts from directly interacting with one another, we use an immediately invoked function expression for each script:

```javascript
(function {

})();
```

In order to pass in information about the page the module is being created on, we use the .setAttribute and .getAttribute methods. So the .setAttribute is used when the module is being created to attach stringifies data to some class attribute, and each script will use the .getAttribute method to retrive that data. The current standard is to pass in the container selector of the module and the object that the module if created for. So, for each script, these values must be retrieved. Essentially each script looks like this:

```javascript
(function {
    const containerSelector = document.currentScript.getAttribute("data-container");
    const characterData = JSON.parse(document.currentScript.getAttribute("data-characterData"));
    const container = document.querySelector(containerSelector);
    const modData = JSON.parse(document.currentScript.getAttribute("data-modData"));
})();
```

Lastly, each script is responsible for activating the built in functions to control the module itself, so selecting, snapping/moving, and resizing. This is done by invoking functions that should already exist in the context which the module exists in, so they can be directly called in each script. Ultimately, to create a script will all this base functionality, you write:

```javascript
(function {
    const containerSelector = document.currentScript.getAttribute("data-container");
    const characterData = JSON.parse(document.currentScript.getAttribute("data-characterData"));
    const container = document.querySelector(containerSelector);
    const modData = JSON.parse(document.currentScript.getAttribute("data-modData"));

    if (typeof initModuleResize === "function") {
        initModuleResize(moduleElem);
      }
    
    if (typeof initializeSnapping === "function") {
        initializeSnapping();
    }
})();
```

## Attaching a Script
To attach a script to a module, simply place the path to the script in the scripts field of the module. Then the module_display function will automatically attach the script using the current standars when creading the page. An example module format looks like:

```javascript
{type: "backstory", value: ["{\"ops\":[{\"insert\":\"Backstory\\n\"}]}"], position: { x: 524, y: 77 },nsize: { width: "400px", height: "140px" }, scripts: ['../scripts/richEditorText.js']  }
```

