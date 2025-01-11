let modules;
let selectedModules;
let unselectedModules;

document.addEventListener("DOMContentLoaded", () => {
    modules = document.querySelectorAll('.module');
    selectedModules;
    unselectedModules = document.querySelectorAll('.module:not(.selected)');;

    // select module on left click
    modules.forEach(element => {
        element.addEventListener('mousedown', (event) => {
            // if left click
            if (event.button !== 0) return;

            // set dragging variables
            isDragging = true;
            initialMouseX = event.clientX;
            initialMouseY = event.clientY;

            // if holding ctrl, toggle selection
            if (event.ctrlKey) {
                element.classList.toggle('selected');
            }
            // if already selected, do nothing
            else if (element.classList.contains('selected')) {
                return;
            }
            // deselect if not holding ctrl or selecting another element
            else {
                deselect();
                element.classList.add('selected');
            }

            // update selected and unselected modules
            selectedModules = document.querySelectorAll('.module.selected');
            unselectedModules = document.querySelectorAll('.module:not(.selected)');
        });

        // prevent default drag behavior
        element.addEventListener('dragstart', (event) => {
            event.preventDefault();
        });
    });


    // deselect all when clicking blank space unless holding ctrl
    document.addEventListener('mousedown', (event) => {
        if (event.target === document.getElementById('page') && !event.ctrlKey) {
            deselect();
        }
    });

    // deselect all helper function
    function deselect() {
        modules.forEach(e => e.classList.remove('selected'));
        selectedModules = [];
    } 
});