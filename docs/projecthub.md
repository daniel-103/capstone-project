# Project Hub documentation

The Project Hub accompanies consists of the template gallery and project gallery which appears when first opening the app
The added project gallery lists the projects that the user has already created
The order of the project cards is in order of most recently accessed 
A dropdown menu displays an alternate view of the user's created projects 

# File overview

The project gallery builds off of the template gallery, so it resides within the template html file

### 1. `template.html`
This is the main HTML file that structures the template gallery and the project gallery

**Key Components:**
- Links to `template.css` for styling
- Links to `projects.js` for functionality

### 2. `template.css`
Styles the layout and appearance of the template gallery

**Key Components:**
- Grid layout for the project cards
- Hover effects for interactivity

### 3. `projects.js`
Handles the dynamic creation of project cards and user interaction

**Key Components:**
- Defines a list of templates
- Dynamically generates template cards in the gallery