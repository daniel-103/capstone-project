# Tutorials Overview

This document provides an overview of all the tutorials available in the `/src/components/tutorials` folder. These tutorials are designed to guide users through various features of the application.

---

## 1. `headerButtonsTutorial.js`

### Purpose
This tutorial explains the functionality of the header buttons in the application.

### Key Features
- Guides users through the "File", "Edit", "View", "Insert", "Format", and "Tools" menus.
- Highlights buttons like Save, Undo, Redo, Insert Header, and more.
- Includes interactive steps for dropdown menus and their options.

### Example Steps
- **File Menu**: "This is the File menu. Click here to access file-related actions like saving, opening, and exporting documents."
- **Edit Menu**: "This is the Edit menu. Click here to access editing actions like undo, redo, cut, copy, and paste."

---

## 2. `hierarchyTutorial.js`

### Purpose
This tutorial introduces the File Hierarchy and its features.

### Key Features
- Explains the structure of the File Hierarchy.
- Demonstrates actions like creating new files and folders.
- Guides users through toggling between root and current directory views.

### Example Steps
- **File Hierarchy**: "This is the File Hierarchy. It displays your project's file structure."
- **New File Button**: "Click this button to create a new file in your project."

---

## 3. `mainPageTutorial.js`

### Purpose
This tutorial provides an introduction to the main page of the application.

### Key Features
- Highlights the left panel (File Hierarchy) and right panel (Text Editor).
- Explains the overall layout and navigation of the main page.
- Sends messages to start other tutorials, such as the Hierarchy tutorial.

### Example Steps
- **Left Panel**: "This is the left panel, which contains the File Hierarchy."
- **Right Panel**: "This is the right panel, which contains the Text Editor."

---

## 4. `projectHubTutorial.js`

### Purpose
This tutorial introduces the Project Hub, where users can manage their projects.

### Key Features
- Explains the Template Gallery and Project Gallery.
- Highlights the dropdown menu for viewing created projects.
- Guides users through creating new projects from templates.

### Example Steps
- **Template Gallery**: "Here is the gallery of templates you can use."
- **Project Gallery**: "This section displays your current projects."

---

## 5. `textEditorTutorial.js`

### Purpose
This tutorial explains the features of the Text Editor.

### Key Features
- Highlights the main editor, toolbar, and word counter.
- Demonstrates the use of features like AI Assistant, Research Tools, and Text-to-Speech.
- Explains how to create sections and organize content.

### Example Steps
- **Main Editor**: "This is the main editor where you can write and edit your content."
- **AI Assistant**: "This is the AI Assistant, SkripMancer. Use it to generate ideas or get writing suggestions."

## 6. `firstTimeUsers.js`

### Purpose
This tutorial set is designed specifically for first-time users to guide them through the application's core features and functionality.

### Key Features
- Automatically detects first-time users and initiates the tutorial sequence.
- Guides users through the Project Hub, File Hierarchy, and Text Editor.
- Ensures users understand how to navigate and use the application's main components.

### Example Steps
- **Project Hub**: "Welcome to Skriptor! This is the Project Hub, where you can manage your projects."
- **File Hierarchy**: "This is the File Hierarchy. It displays your project's file structure."
- **Text Editor**: "This is the main editor where you can write and edit your content."

---

## General Notes
- All tutorials use the `introJs` library for interactive guidance.
- Tutorials are triggered by specific actions or buttons, such as the "Start Tutorial" button in the Help menu.
- Each tutorial is modular and can be extended with additional steps as needed.
- The first-time user tutorial is triggered automatically if no prior tutorial completion is detected in `localStorage`.

For more details, refer to the respective tutorial files in the `/src/components/tutorials` folder.