# Project Hub documentation

The Project Hub accompanies consists of the template gallery and project gallery which appears when first opening the app
The added project gallery lists the projects that the user has already created
The order of the project cards is in order of most recently accessed 
A dropdown menu displays an alternate view of the user's created projects 

## File overview

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

## Toolbar Buttons for Current Projects

The toolbar in the project hub provides quick actions for managing projects. These buttons are implemented in `projects.js` and include the following:

1. **Open Project**  
   - Functionality: Opens the selected project in the workspace, allowing the user to view or edit its contents.  
   - Behavior: Clicking this button navigates the user to the project editor interface, loading all associated data for the project.  
   - Purpose: Provides quick access to start working on a project without navigating through additional menus.

2. **View Project Info**  
   - Functionality: Displays detailed information about the selected project, such as its name, description, creation date, and last modified date.  
   - Behavior: Opens a modal or side panel with project metadata and additional details.  
   - Purpose: Helps users quickly review project details without opening the project itself.

3. **Change Project Image**  
   - Functionality: Lets the user update or replace the image associated with the project.  
   - Behavior: Clicking this button opens a file picker or image selection dialog, allowing the user to upload a new image or choose from existing assets.  
   - Purpose: Enhances the visual representation of projects, making it easier to identify them at a glance.

4. **Rename Project Title**  
   - Functionality: Allows the user to update the title of the selected project directly from the toolbar.  
   - Behavior: Clicking this button enables an inline editing mode or opens a dialog box where the user can input a new title.  
   - Purpose: Simplifies the process of renaming projects, making it more accessible and efficient.

5. **Rename Project Description**  
   - Functionality: Enables the user to modify the description of the selected project.  
   - Behavior: Similar to renaming the title, this button allows inline editing or opens a dialog box for updating the description.  
   - Purpose: Provides a quick way to update project descriptions to reflect changes or add more context.

6. **Duplicate Project**  
   - Functionality: Creates an exact copy of the selected project, including its title, description, and associated data.  
   - Behavior: Clicking this button generates a new project card in the gallery with the same content as the original, appending "Copy" to the title.  
   - Purpose: Allows users to create variations of a project or use an existing project as a template for a new one.

7. **Delete Project**  
   - Functionality: Removes the selected project from the gallery after a confirmation step to prevent accidental deletion.  
   - Behavior: Clicking this button triggers a confirmation dialog. If confirmed, the project is permanently deleted from the gallery and associated storage.  
   - Purpose: Provides a way to clean up unused or outdated projects while ensuring accidental deletions are avoided.

These buttons are dynamically added to each project card in the gallery and provide essential functionality for managing projects efficiently. They are designed to streamline common project management tasks, ensuring a user-friendly experience within the Project Hub.