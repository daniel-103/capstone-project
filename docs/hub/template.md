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
When the user clicks on one of the template cards, it will redirect them to a new project file. The file hierarchy is populated with folders and files related to the template that the user clicked on. When the user clicks on ones of the files, the text editor will be populated with text related to the file that the user clicked on. 

**Key Components:**
```
const predefinedText = {
    1: {
        'story.txt': `
			Title: [Your Short Story Title]
			
			Once upon a time...
		`,
        'outline.txt': `
			Title: [Your Short Story Title] 
			1. Introduction - Setting & Characters 
			2. Conflict - What problem arises? 
			3. Climax - The turning point 
			4. Resolution - How does it end?
		`,
        'characters.txt': `
			Character Name: [Name]  
			Role: [Protagonist/Antagonist/Side Character]  
			Description: [Appearance, Personality, Motivation]  
		`
    },
    ...
}
```
This contains the predefined text for each file for every template. It sorts by the template id.


```
card.onclick = async () => {
    const windowIframe = window.parent.document.getElementById('window');
    const predefinedTextForTemplate = predefinedText[template.id];
    windowIframe.src = `components/window/window.html?templateId=${template.id}&predefinedText=${encodeURIComponent(JSON.stringify(predefinedTextForTemplate))}`;
};
```


When the user clicks on the card, the template id along with the predefined text for the template is sent to the window Iframe. That information is then used by the hierarchy and textEditor Iframes through window listeners in each of their respective scripts. The functionality is handled below:

```
<script>
    window.addEventListener('DOMContentLoaded', () => {
        // Parse the URL parameters to get the templateId
        const urlParams = new URLSearchParams(window.location.search);
        const templateId = urlParams.get('templateId');
        const predefinedText = JSON.parse(decodeURIComponent(urlParams.get('predefinedText')));
        console.log('Template ID:', templateId);
        console.log('Predefined Text:', predefinedText);

        // Get the hierarchy iframe element
        const hierarchyIframe = document.getElementById('hierarchyIframe');

        // Get the text editor iframe element
        const textEditorIframe = document.getElementById('textEditorIframe');

        // When the iframe has loaded, send the templateId to it
        hierarchyIframe.onload = () => {
            hierarchyIframe.contentWindow.postMessage({ templateId }, '*');
        };

        // When the iframe has loaded, send the templateId and predefinedText to it
        textEditorIframe.onload = () => {
            textEditorIframe.contentWindow.postMessage({ templateId, predefinedText }, '*');
        };

        // Forward the fileClicked message to the text editor iframe
        window.addEventListener('message', (event) => {
            if (event.data.type === 'fileClicked') {
                textEditorIframe.contentWindow.postMessage(event.data, '*');
            }
        });
    });
</script>
```