(function() {
    const htmlModuleID = document.currentScript.dataset.id
    const htmlModule = document.querySelectorAll('.module')[htmlModuleID];
    const htmlPage = document.getElementById('page');
    const stagedPage = window.top.stagedPage;
    const stagedModule = stagedPage.modules[htmlModuleID];
    const htmlPageWindow = document.getElementById('page-window');

    htmlModule.style = `
        position: absolute; 
        left: ${stagedModule.position.x}; 
        top: ${stagedModule.position.y};
        width: ${stagedModule.size.x};    
        height: ${stagedModule.size.y};
    `;



    let pElement = document.createElement('p');
    pElement.textContent = stagedModule.content;
    htmlModule.appendChild(pElement)

    const linkDiv = document.createElement('link');
    linkDiv.rel = 'stylesheet';
    linkDiv.href = `file://${window.top.appPath}/src/modules/textBox/textBox.css`;
    htmlModule.appendChild(linkDiv);

})();
