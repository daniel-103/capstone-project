# Template Gallery Documentation

When the application is loaded, the template gallery is shown first along with the project files. When clicking on a card, it will auto generate the workspace based on the template. The template images are located in the assets folder

## Files Overview

### 1. `template.html`
This is the main HTML file that structures the template gallery

**Key Components:**
- Links to `template.css` for styling
- Links to `template.js` for functionality

### 2. `template.css`
Styles the layout and appearance of the template gallery

**Key Components:**
- Grid layout for the template cards
- Hover effects for interactivity

### 3. `template.js`
Handles the dynamic creation of template cards and user interaction

**Key Components:**
- Defines a list of templates
- Dynamically generates template cards in the gallery

## Auto Generation of Preformatted Content
When the user clicks on one of the template cards, it will redirect them to a new project file. The file hierarchy is populated with folders and files related to the template that the user clicked on. These files and folders are added to the database when the user clicks on the template card, so clicking on any of the files in the hierarchy would open a tab associated with the db object.

**Key Components:**
```
const templateData = {
    name: 'Project Name',
    image: './path/to/image.jpg',
    description: 'Project description',
    files: [
        {
            type: 'folder',
            document: {
                name: "folderName",
                type: "folder",
                parentId: null,
                childrenIds: [],
                date: {
                    created: new Date(),
                    last: new Date(),
                },
            },
            children: [
                {
                    type: 'file',
                    document: {
                        parentId: null,
                        type: 'file',
                        name: 'fileName',
                        fileType: 'textDocument',
                        textData: "{text data in quill's delta format}"
                    }
                },
            ]
        },
    ]
}
```
This is the general format of a template. It can contain files and folders, and a file is in the array of it's parent's folder. If the file is not in a folder's children element, it is a child of the main project folder.


```
card.onclick = async () => {
    const projectId = await initProjectFromTemplate(template);
    localStorage.setItem('projectId', projectId);
    const windowIframe = window.parent.document.getElementById('window');
    windowIframe.src = `components/window/window.html`;
};
```


When the user clicks on the card, the project is created via the injectFromTemplate function. The local storage is used to store the project id, so that when we switch to the window.html source, the hierarchy will be generated using the current projectId in local storage.
