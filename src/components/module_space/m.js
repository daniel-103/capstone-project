// This is just pseudo-code for planning and design purposes. This has no functionality.

// Get page object from db
const page = {}; // window.top.db.get(...) blah blah, just an empty object for now.

// For each module in the page
for (const module of page.modules) {

    // Create the module div in the page and attach the constructor script to it. Once loaded, the script will run
    const moduleDiv = document.createElement('div');

    // Create, set, and attach the module's constructor script
    const scriptElement = document.createElement('script');
    scriptElement.src = `path/to/module/constructors/${module.type}.js`;    // Common path to the module constructor scripts. The type of the module is the name of its constructor.
    moduleDiv.appendChild(scriptElement);

    // Somehow pass the rest of the module data to the module's constructor script
        // Maybe await the script to be loaded and have the script attach its constructor method to the module div
        // Doing it this way kind of reminds me of class polymorphism in that the construct() method is overwritten to behave differently but called the same between modules
    await moduleDiv.construct()     // No idea if this even works, just trying to convey the idea. Maybe throw await on where the script src is set?
    moduleDiv.construct(module)     // Run the constructor script. I think it's possible to run scripts like this?
    
    // The module's constructor script will take care of creating the elements of the modules
        // This will do things like populate the content of the module and set its position
        // It can also import its own scripts like snap.js

    // Move on to the next module
}




