let modules;
let selectedModules;
let unselectedModules;

document.addEventListener("DOMContentLoaded", () => {
    initSelection();
});

function initSelection() {
    modules = document.querySelectorAll(".module");
    selectedModules = [];
    unselectedModules = document.querySelectorAll(".module:not(.selected)");

    modules.forEach(element => {
        element.addEventListener("mousedown", (event) => {
            // Only left-click
            if (event.button !== 0) return;

            // If ctrl is held, toggle selection
            if (event.ctrlKey) {
                element.classList.toggle("selected");
            } else {
                // If it's already selected, do nothing
                if (element.classList.contains("selected")) {
                    return;
                }
                // Otherwise, deselect all then select this one
                deselectAll();
                element.classList.add("selected");
            }

            // update selected and unselected modules
            selectedModules = document.querySelectorAll('.module.selected');
            unselectedModules = document.querySelectorAll('.module:not(.selected)');
        
        });

        // prevent default dragstart
        element.addEventListener('dragstart', (event) => {
            event.preventDefault();
        });
    });
}

function deselectAll() {
    modules.forEach(e => e.classList.remove('selected'));
    selectedModules = [];
}

// deselect all when clicking blank
document.addEventListener('mousedown', (event) => {
    if (!event.target.closest(".module") && !event.ctrlKey) {
        deselectAll();
    }
});

function initializeSnapping() {
    initSelection(); 
    initSnap();  
}
