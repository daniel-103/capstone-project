(function() {
    const htmlModule = document.querySelector('.module')
    const htmlModuleID = htmlModule.dataset.id
    const stagedPage = window.top.stagedPage
    const stagedModule = stagedPage.modules[htmlModuleID]


    const contentDiv = document.createElement('div');
    const textArea = document.createElement('p');
    textArea.textContent = stagedModule.name;
    textArea.style = `position: absolute; left: ${stagedModule.position.x}; top: ${stagedModule.position.y}`;
    contentDiv.appendChild(textArea);
    htmlModule.appendChild(contentDiv);

    const linkDiv = document.createElement('link');
    linkDiv.rel = 'stylesheet';
    linkDiv.href = `file://${window.top.appPath}/src/modules/title/title.css`;
    htmlModule.appendChild(linkDiv);
})();

