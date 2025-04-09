## What is a module?
A module is an element on the page which the user edits with the content of their work. Modules come in the form of text, images, events, relations, etc... These different types of modules can be used however the user sees fit to efficiently organize information in a way that makes sense to them. While text modules offer a catch-all solution, event and relation modules are specialized modules used to represent their respective types of information and is primarily used to construct graphs of this data. See `docs/timeline.md` for example.

## Selecting
In order to manipulate a module, the user must have a way to declare what module they want to manipulate. This is done through selection. To select a module, simply `left-click` the module with the mouse. A selected module is bordered with a highlight. You can select multiple modules by holding `ctrl` and left-clicking another unselected module. Doing this on an already selected module will unselect it. To deselect all modules, simply left-click empty space within the page.

To be more techinical, two arrays are maintained; `selectedModules` and `unselectedModules`. On document load, `selectedModules` is left empty and `unselectedModules` is initialized with a querySelectorAll on all elements that have the `.module` class and do not have the `.selected` class, (which should be none). Event listeners are in place to detect when the user clicks on a module and correspondingly handles the interaction by adding removing the module between the two arrays. This code is in `src/components/page/select.js`.

## Moving
Spacing and position is a common tool to group and separate ideas. To allow for this, a module's position must be allowed to change as the user wishes. To move a module, simply click and hold `left-click` on a selected module and move the mouse to move it to a new location. If multiple modules are selected, all of the selected modules will move with the module that is dragged.

## Snapping
People like neatness and order. When moving modules, it is difficult to align modules with each other perfectly since modules move at per-pixel precision. This is why when the user holds `shift` while moving a module, the module will snap both to a grid and to other modules. 

For a more in-depth explanation of how snapping is done. For each selected module that is moved, its position is considered. There are three points which can be gotten using the module's size; the top left corner, the absolute center, and the bottom right corner. Then for each unselected module, the same three points are calculated. The distances between each point to each point are calculated for each direction, resulting in 9 distances per direction. The smallest distance is gotten for each direction and if it is below the snapping threshold distance, then the element is eligible to snap. The snap done by noting which type of snap the smallest distance is and apply the appriate offset along with the distance difference (which is the smallest distance.) 

## Risizing (future)
Clicking on the edge of a module and dragging allows for the resizing of a module.

## Adding/Deleting
The modules of a page are dynamic, and the number of modules on a page can be adjusted by the user.

You can add text modules by right clicking, going to the add module option and selecting the text module. Doing so will add another module to the page, the same type as most modules (a module with a text editor inside it). 

You can delete a module by pressing on it's border, then pressing backspace. This cannot be undone.