# Header Buttons and Menus

This document explains the purpose and functionality of the header buttons and their associated menus in the text editor. The event listeners and functions ensure that the appropriate actions are taken when the buttons are clicked.

There are two javascript files pertaining to the header buttons: `header.js` and `header_textEditor.js`. The `header.js` file was originally designed to have the functionality for all of the buttons. However, because the text editor and the `index.html` file were in separate iframes, the `header.js` script couldn't directly communicate with the text editor. As a result, the header buttons' functionality failed, causing errors when importing the script into `index.html`. Therefore, since most of the header buttons deals specifically with the text editor, the `header_textEditor.js` was created and imported in the text editor.html file, and those said the header buttons were handled in there while the original `header.js` file handles buttons that are not necessarily associated with the text editor.

NOTE: These are all tentative options for the buttons currently. They will most likely change in future sprints

## Header Buttons

### 1. File
The "File" button provides options for file operations such as saving and settings.

#### Save
- **Button ID:** `file-save-btn`
- **Functionality:** Saves the current contents of the document.

NOTE: This is still a work in progress due to us still actively trying to figure out an official orchestrated structure of storing things in the database, thus there is no current functionality for this button

#### Save As...
- **Button ID:** `file-save-as-btn`
- **Functionality:** Provides options to save and export the document in different formats.
  - **PDF:** `file-save-as-pdf-btn`
  - **DOCX:** `file-save-as-docx-btn`
  - **TXT:** `file-save-as-txt-btn`

#### Open
- **Button ID:** `file-open-btn`
- **Functionality:** Opens a tool that allows you to select or drag and drop a word or .txt file. It will then extract the text and (some) formatting, and create a new text document with that extracted text.

#### Settings
- **Button ID:** `file-settings-btn`
- **Functionality:** Opens the settings menu for the application.

NOTE: This is still a work in progress. All we have for this button is theme switching for now

#### Page Types
- **Button ID:** `"file-project-types-btn`
- **Functionality:** Opens the menu allowing user to view all page types and modify what page types are associated with the current project.

### 2. Edit
The "Edit" button provides options for editing operations such as undo, redo, cut, copy, paste, find, and replace.

#### Undo
- **Button ID:** `edit-undo-btn`
- **Functionality:** Undoes the last action. (Shortcut: Ctrl + Z)

#### Redo
- **Button ID:** `edit-redo-btn`
- **Functionality:** Redoes the last undone action. (Shortcut: Ctrl + Y)

#### Cut
- **Button ID:** `edit-cut-btn`
- **Functionality:** Cuts the selected text. (Shortcut: Ctrl + X)

#### Copy
- **Button ID:** `edit-copy-btn`
- **Functionality:** Copies the selected text. (Shortcut: Ctrl + C)

#### Paste
- **Button ID:** `edit-paste-btn`
- **Functionality:** Pastes the copied or cut text. (Shortcut: Ctrl + V)

#### Find
- **Button ID:** `edit-find-btn`
- **Functionality:** Opens the find dialog to search for text in the document.

#### Replace
- **Button ID:** `edit-replace-btn`
- **Functionality:** Opens the replace dialog to search and replace text in the document.

### 3. View
The "View" button provides options for zooming in, zooming out, and resetting the zoom level.

#### Zoom In
- **Button ID:** `view-zoom-in-btn`
- **Functionality:** Zooms in on the document. (Shortcut: Ctrl + Shift + +)

#### Zoom Out
- **Button ID:** `view-zoom-out-btn`
- **Functionality:** Zooms out of the document. (Shortcut: Ctrl + -)

#### Reset Zoom
- **Button ID:** `view-reset-zoom-btn`
- **Functionality:** Resets the zoom level to the default. (Shortcut: Ctrl + 0)

### 4. Insert
The "Insert" button provides options for inserting images and tables into the document.

#### Insert Image
- **Button ID:** `insert-image-btn`
- **Functionality:** Inserts an image into the document.

#### Insert Table
- **Button ID:** `insert-table-btn`
- **Functionality:** Inserts a 3x3 table into the document.

NOTE: This will most likely change to where the user can insert what type of table that they want themselves

### 5. Format
The "Format" button provides options for inserting headers, footers, and page numbers into the document.

NOTE: These buttons are a bit messed up, especially in particular with the footer being inserted on the top of the document instead on the bottom. I wasn't able to completely them by the end of Sprint 3 but it should be an easy fix. I plan to fix them in future sprints.

#### Insert Header

- **Button ID:** `insert-header-btn`
- **Functionality:** Inserts a header with a separator line below it at the beginning of the document.

#### Insert Footer
- **Button ID:** `insert-footer-btn`
- **Functionality:** Inserts a footer with a separator line above it at the end of the document.

#### Insert Page Number
- **Button ID:** `insert-page-number-btn`
- **Functionality:** Inserts page numbers at the top right of each new page, with spacing below the page number.

### 6. Tools
The "Tools" button provides various tools to enhance the document.

#### Spelling & Grammar
- **Button ID:** `tools-spelling-btn`
- **Functionality:** Checks the document for spelling and grammar errors and displays the results.

#### Word Count
- **Button ID:** `tools-word-count-btn`
- **Functionality:** Counts the number of words in the document and displays the result.

### 7. Help
The "Help" button provides access to tutorials and guidance for using the application.

#### Start Tutorial
- **Button ID:** `help-tutorial-btn`
- **Functionality:** Starts an interactive tutorial that guides the user through the application's features and functionality.
---

# Custom Right-Click Context Menu

## Purpose

The custom right-click context menu is designed to provide users with a convenient and efficient way to access common actions within the application. This menu appears when the user right-clicks on an element within the application, offering a set of options that are contextually relevant to the user's current task.

NOTE: These are all tentative options for the buttons currently. They will most likely change in future sprints

## Functionality

The custom context menu includes the following options:

1. **Cut**: Removes the selected content and places it in the clipboard, allowing the user to paste it elsewhere.
2. **Copy**: Copies the selected content to the clipboard without removing it from its original location.
3. **Paste**: Inserts the content from the clipboard at the current cursor position or replaces the selected content.
4. **Delete**: Removes the selected content without placing it in the clipboard.
5. **Insert Image**: Opens a dialog or interface for the user to insert an image into the document.
6. **Insert Table**: Opens a dialog or interface for the user to insert a table into the document.

### Contextual Options

- If the user right-clicks without highlighting text, the menu shows the following options:
  - **Paste**
  - **Insert Image**
  - **Insert Table**

- If the user right-clicks after highlighting text, the menu shows the following options:
  - **Cut**
  - **Copy**
  - **Paste**
  - **Delete**
