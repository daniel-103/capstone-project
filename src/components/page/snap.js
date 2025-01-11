// This is the 5th (and hopefully last) iteration of snapping
// The only thing that needs to be done is to dynamically set the parameters such as 
// SNAP_THRESHOLD, GRID_SIZE, RADIUS_SCALER, and RADIUS_EXTRA.
// Even more things can be tweaked such as the color of the snap lines, the thickness of the snap lines, etc.
// I'll do that later...

// hey idiot, this is a spot to stop
// THE STOP SPOT
// This just for me to ctrl+z to revert back to a working state when I wrote this.

const SNAP_THRESHOLD = 20;

const GRID_SIZE = 50;
const GRID_COLOR = 'rgba(0, 0, 0, 0.1)';
const GRID_THICKNESS = 1;

const RADIUS_SCALER = 1;
const RADIUS_EXTRA = 50;



let isDragging = false;
let initialMouseX, initialMouseY;
let snappingState = new Map();

document.addEventListener("DOMContentLoaded", () => {
    // Set initial position of modules
    modules.forEach(element => {
        element.initialLeft = element.offsetLeft;
        element.initialTop = element.offsetTop;
    });

    const page = document.getElementById('page');
    const grid = document.getElementById('grid');

    // On mouse move
    document.addEventListener('mousemove', (event) => {
        // Do nothing if not dragging
        if (!isDragging) return;

        // Remove previous snap lines
        document.querySelectorAll('.snap-line').forEach(line => line.remove());

        // Clear previous masks
        let masks = [];
        grid.style.mask = '';

        // Calculate change in mouse position
        const deltaX = event.clientX - initialMouseX;
        const deltaY = event.clientY - initialMouseY;

        // For each selected module
        selectedModules.forEach(selectedModule => {
            // If not holding ctrl, move module and return without snapping
            if (!event.ctrlKey) {
                selectedModule.style.left = `${selectedModule.initialLeft + deltaX}px`;
                selectedModule.style.top = `${selectedModule.initialTop + deltaY}px`;
                return;
            }

            // Ctrl is held, get bounding rect of selected module
            const selectedRect = selectedModule.getBoundingClientRect();
            const initialLeft = selectedModule.initialLeft + deltaX;
            const initialTop = selectedModule.initialTop + deltaY;

            // Push radial gradient masks for each selected module
            masks.push(`radial-gradient(circle ${((selectedRect.width + selectedRect.height)/2) * RADIUS_SCALER + RADIUS_EXTRA}px at ${selectedRect.left + selectedRect.width/2}px ${selectedRect.top + selectedRect.height/2}px, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)`);

            // Initialize variables
            let closestSnap = { x: null, y: null, distanceX: Infinity, distanceY: Infinity };
            let lineX = null;
            let lineY = null;

            // Axis snap points for selected element (left, center, right) / (top, center, bottom)
            const selectedX = [initialLeft, initialLeft + selectedRect.width / 2, initialLeft + selectedRect.width];
            const selectedY = [initialTop, initialTop + selectedRect.height / 2, initialTop + selectedRect.height];

            // Find the closest snap point for both axes (grid)
            selectedX.forEach((sx, sxIndex) => {
                const snapDistanceX = Math.abs(sx - Math.round(sx / GRID_SIZE) * GRID_SIZE);
                if (snapDistanceX <= closestSnap.distanceX && snapDistanceX < SNAP_THRESHOLD) {
                    closestSnap.x = (Math.round(sx / GRID_SIZE) * GRID_SIZE) - (sx - initialLeft);
                    closestSnap.distanceX = snapDistanceX;
                }
            });

            selectedY.forEach((sy, syIndex) => {
                const snapDistanceY = Math.abs(sy - Math.round(sy / GRID_SIZE) * GRID_SIZE);
                if (snapDistanceY <= closestSnap.distanceY && snapDistanceY < SNAP_THRESHOLD) {
                    closestSnap.y = (Math.round(sy / GRID_SIZE) * GRID_SIZE) - (sy - initialTop);
                    closestSnap.distanceY = snapDistanceY;
                }
            });

            // For each unselected module
            unselectedModules.forEach(unselectedModule => {
                // Get bounding rect of unselected module
                const unselectedRect = unselectedModule.getBoundingClientRect();

                // Axis snap points for unselected element (left, center, right) / (top, center, bottom)
                const unselectedX = [unselectedRect.left, unselectedRect.left + unselectedRect.width / 2, unselectedRect.right];
                const unselectedY = [unselectedRect.top, unselectedRect.top + unselectedRect.height / 2, unselectedRect.bottom];

                // Find the closest snap point for both axes (unselected element)
                selectedX.forEach((sx, sxIndex) => {
                    unselectedX.forEach((ux, uxIndex) => {
                        const snapDistanceX = Math.abs(sx - ux);
                        if (snapDistanceX <= closestSnap.distanceX && snapDistanceX < SNAP_THRESHOLD) {
                            closestSnap.x = ux - (sx - initialLeft);
                            closestSnap.distanceX = snapDistanceX;

                            // Set the vertical line to draw for the horizontal snap
                            lineY = {
                                x : ux, 
                                y1 : selectedRect.top + selectedRect.height / 2, 
                                y2 : unselectedRect.top + unselectedRect.height / 2
                            };

                        }
                    });
                });

                selectedY.forEach((sy, syIndex) => {
                    unselectedY.forEach((uy, uyIndex) => {
                        const snapDistanceY = Math.abs(sy - uy);
                        if (snapDistanceY <= closestSnap.distanceY && snapDistanceY < SNAP_THRESHOLD) {
                            closestSnap.y = uy - (sy - initialTop);
                            closestSnap.distanceY = snapDistanceY;

                            // Set the horizontal line to draw for the vertical snap
                            lineX = {
                                y : uy, 
                                x1 : selectedRect.left + selectedRect.width / 2, 
                                x2 : unselectedRect.left + unselectedRect.width / 2
                            };
                        }
                    });
                });
            });

            // Draw the snap lines
            if (lineY !== null) {
                const snapLine = document.createElement('div');
                snapLine.classList.add('snap-line');
                snapLine.style.left = `${lineY.x}px`;
                snapLine.style.top = `${Math.min(lineY.y1, lineY.y2)}px`;
                snapLine.style.width = `1px`;
                snapLine.style.height = `${Math.abs(lineY.y1 - lineY.y2)}px`;
                page.appendChild(snapLine);
            }

            if (lineX !== null) {
                const snapLine = document.createElement('div');
                snapLine.classList.add('snap-line');
                snapLine.style.left = `${Math.min(lineX.x1, lineX.x2)}px`;
                snapLine.style.top = `${lineX.y}px`;
                snapLine.style.width = `${Math.abs(lineX.x1 - lineX.x2)}px`;
                snapLine.style.height = `1px`;
                page.appendChild(snapLine);
            }

            // Set default position (does this even need to be here? I think I could remove this but I'm too scared to try)
            let finalLeft = initialLeft;
            let finalTop = initialTop;

            // Apply new position if closest snap is within threshold
            if (closestSnap.distanceX < SNAP_THRESHOLD) {
                finalLeft =  closestSnap.x;
            }
            if (closestSnap.distanceY < SNAP_THRESHOLD) {
                finalTop = closestSnap.y;
            }

            // Store the snapping state
            if (closestSnap.distanceX < SNAP_THRESHOLD || closestSnap.distanceY < SNAP_THRESHOLD) {
                snappingState.set(selectedModule, { snapX: closestSnap.x, snapY: closestSnap.y });
            } else {
                snappingState.delete(selectedModule);
            }

            // Update element position
            selectedModule.style.left = `${finalLeft}px`;
            selectedModule.style.top = `${finalTop}px`;
            
            grid.style.mask = masks.join(', ');
        });
    });

    // stop dragging
    document.addEventListener('mouseup', async (event) => {
        isDragging = false;

        // Update initial position of modules
        if (!selectedModules) return;
        selectedModules.forEach(element => {
            element.initialLeft = element.offsetLeft;
            element.initialTop = element.offsetTop;
        });

        // Remove snap lines
        document.querySelectorAll('.snap-line').forEach(line => line.remove());

        // Clear masks
        grid.style.mask = '';
    });
});