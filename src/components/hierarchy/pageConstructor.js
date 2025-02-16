async function constructPage(file) {
    if (DUBUG) console.log(`🛠 [10] Constructing page for "${file.name}"...`);
    pageWindow.innerHTML = '';

    // Stage the file object
    window.top.stagedPage = file;

    // Create the page (module container)
    const pageElement = document.createElement('div');
    pageElement.id = 'page';
    pageElement.classList.add(file.fileType)

    // Get path to app
    let appPath = window.top.appPath
    
    // Add each module in the page
    for (const moduleNumber in file.modules) {
        // Get the individual module (because 'for _ in _' is index based.)
        const module = file.modules[moduleNumber]
        // Create the module element
        const moduleElement = document.createElement('div');
        moduleElement.dataset.id = moduleNumber;
        moduleElement.classList.add('module', module.type);

        // Create the script
        const scriptElement = document.createElement('script');
        scriptElement.src = `file://${appPath}/src/modules/${module.type}/${module.type}.js`;
        // Give the script element the same id so it knows which module it's on
        scriptElement.dataset.id = moduleNumber;
        // Add script to module
        moduleElement.appendChild(scriptElement);

        // Add module to page
        pageElement.appendChild(moduleElement);
    }

    // Add page to page window
    pageWindow.appendChild(pageElement)

    if (DUBUG) console.log(`✅ [10] Constructed page for "${file.name}".`, pageElement);
}