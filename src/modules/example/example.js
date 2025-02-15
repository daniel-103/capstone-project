// Example module

// Wrap the code in an Immediately Invoked Function Expression (IIFE) to prevent populating the global scope with instantiated variables.
// This is necessary because without it, the next time a page is loaded and tries to make and use the same variables, it can't because they've already been defined.
(function() {

    // Code will run as soon as the script is loaded
    console.log('Script Loaded');

    // This is the module's id. It's used to find the same module in the Staged Page Object (1*)
    const htmlModuleID = document.currentScript.dataset.id

    // This is the module in the html that loaded the script
    const htmlModule = document.querySelectorAll('.module')[htmlModuleID];

    // This is the page html (container for modules) (2)
    const htmlPage = document.getElementById('page');

    // This is the Staged Page Object. Make changes to this for changes to be saved.
    // The html that the user sees isn't actually saved. They are basically editing the Staged Page Object through the html modules
    const stagedPage = window.top.stagedPage;

    // Use the Staged Page Object to get and set information. 
    const stagedModule = stagedPage.modules[htmlModuleID]; // (1)

    // This is the page window html (container for page). Probably don't use this. Try to use Page instead. (2*)
    const htmlPageWindow = document.getElementById('page-window');



    // Position the module
    htmlModule.style = `position: absolute; left: ${stagedModule.position.x}; top: ${stagedModule.position.y}`;



    // 'Construct' the module. For this example, this script will construct the 'title' module.
    // That means it be placed on 'title' modules and will expect a certain object to grab data from.
    // Modules can be structured however, as long as the scripts on them know how to use the data in that structure.
    const contentDiv = document.createElement('div');   // Not really needed since only once thing is in this module, but it might be usefull to contain multiple things in more complex modules
    const textArea = document.createElement('p');
    textArea.textContent = stagedModule.name;
    contentDiv.appendChild(textArea);
    htmlModule.appendChild(contentDiv);                 // Make sure to append your elements back to the htmlModule

    // Add any style sheets
    const linkDiv = document.createElement('link');
    linkDiv.rel = 'stylesheet';
    linkDiv.href = `file://${window.top.appPath}/src/modules/title/title.css`;
    htmlModule.appendChild(linkDiv);                    // Make sure to append it back to the htmlModule
})();
