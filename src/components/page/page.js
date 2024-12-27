const modules = document.querySelectorAll('.module');
let selectedModules = new Set();
let isDragging = false;
let startX, startY;
let offsets = new Map();

modules.forEach(module => {
    // selection
    module.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            if (!(e.ctrlKey || module.classList.contains('selected'))) {
                deselect();
            }

            module.classList.add('selected');
            selectedModules.add(module);

            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
    
            // Store initial offsets for each selected module
            offsets.clear();
            selectedModules.forEach(m => {
                offsets.set(m, {
                    left: m.offsetLeft,
                    top: m.offsetTop
                });
            });
        }
    });

    // right click menu NOT WORKING
    module.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        createContextMenu(module);
    });
});

// grid snapping parameters
const grid = document.getElementById('grid');
const visualSnapGridSize = 200
const snapGridSize = visualSnapGridSize/2
const snapDistance = 10

// grid fading parameters
let fadeTimer;
const fadeTimeout = 1;
const fadeTime = 1;
const radius = 300;

grid.style.backgroundSize = `${visualSnapGridSize}px ${visualSnapGridSize}px`;

// dragging
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    selectedModules.forEach(m => {
        const initialOffset = offsets.get(m);

        x = initialOffset.left + deltaX
        y = initialOffset.top + deltaY

        m.style.left = `${x}px`;
        m.style.top = `${y}px`;

        // hide grid
        grid.style.mask = `radial-gradient(circle 0px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`;
    
        // NEW NEW SNAPPING (third time was the charm)
        if (!e.shiftKey) return;

        // show grid
        clearTimeout(fadeTimer);
        grid.style.mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)`;
        
        // hide grid after timeout
        fadeTimer = setTimeout(() => {
            grid.style.mask = `radial-gradient(circle 0px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`;
        }, (fadeTimeout * 1000));

        // define horizontal lengths
        const ll = x % snapGridSize;
        const lr = snapGridSize - ll;
        const cl = (ll + m.offsetWidth/2) % snapGridSize;
        const cr = snapGridSize - cl;
        const rl = (ll + m.offsetWidth) % snapGridSize;
        const rr = snapGridSize - rl;

        const snapDataX = {
            ll: { direction: 'forward', side: 'outer',distance: ll },
            lr: { direction: 'backward', side: 'inner', distance: lr },
            cl: { direction: 'forward', side: 'inner',distance: cl },
            cr: { direction: 'backward', side: 'inner', distance: cr },
            rl: { direction: 'forward', side: 'inner',distance: rl },
            rr: { direction: 'backward', side: 'outer', distance: rr },
        };

        // define vertical lengths
        const tt = y % snapGridSize;
        const tb = snapGridSize - tt;
        const ct = (tt + m.offsetHeight/2) % snapGridSize;
        const cb = snapGridSize - ct;
        const bt = (tt + m.offsetHeight) % snapGridSize;
        const bb = snapGridSize - bt;

        const snapDataY = {
            tt: { direction: 'forward', side: 'outer', distance: tt },
            tb: { direction: 'backward', side: 'inner', distance: tb },
            ct: { direction: 'forward', side: 'inner', distance: ct },
            cb: { direction: 'backward', side: 'inner', distance: cb },
            bt: { direction: 'forward', side: 'inner', distance: bt },
            bb: { direction: 'backward', side: 'outer',distance: bb },
        };

        // find closest horizontal snapping point
        const closestSnapX = Object.entries(snapDataX).reduce((acc, [key, obj]) => {
            return obj.distance < acc.distance ? { key, ...obj } : acc;
        }, { key: null, distance: Infinity, side: null, direction: null });

        // find closest vertical snapping point
        const closestSnapY = Object.entries(snapDataY).reduce((acc, [key, obj]) => {
            return obj.distance < acc.distance ? { key, ...obj } : acc;
        }, { key: null, distance: Infinity, side: null, direction: null });

        // check if within snapping distance horizontally
        if ((closestSnapX.side == 'outer' && closestSnapX.distance < snapDistance) || 
            (closestSnapX.side == 'inner' && closestSnapX.distance < m.offsetWidth/4)) {
            
            // apply horizontal snap
            if (closestSnapX.direction == 'forward') {
                m.style.left = `${x - closestSnapX.distance}px`;
            } else if ( closestSnapX.direction == 'backward') {
                m.style.left = `${x + closestSnapX.distance}px`
            }
        }

        // check if within snapping distance vertically
        if ((closestSnapY.side == 'outer' && closestSnapY.distance < snapDistance) || 
            (closestSnapY.side == 'inner' && closestSnapY.distance < m.offsetHeight/4)) {
            
            // apply vertical snap
            if (closestSnapY.direction == 'forward') {
                m.style.top = `${y - closestSnapY.distance}px`;
            } else if ( closestSnapY.direction == 'backward') {
                m.style.top = `${y + closestSnapY.distance}px`
            }
        }
    });
});

// stop dragging
document.addEventListener('mouseup', (e) => {
    isDragging = false;
    grid.style.mask = `radial-gradient(circle 0px at ${e.clientX}px ${e.clientY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`;
});

// click blank space, deselect
document.addEventListener('mousedown', (e) => {
    if (e.target === document.getElementById('page')) {
        deselect();
    }
});

document.addEventListener('mousedown', (event) => {
    console.log('down')
    console.log(event.target)
})

document.addEventListener('mouseup', (event) => {
    console.log('up')
})

function deselect() {
    selectedModules.forEach(m => m.classList.remove('selected'));
    selectedModules.clear();
}

// function createContextMenu(target) {
//     const { Menu, MenuItem } = require('@electron/remote');
//     const menu = new Menu();

//     menu.append(new MenuItem({ label: 'Copy', click: () => copyModule(target) }));
//     menu.append(new MenuItem({ label: 'Paste', click: () => pasteModule(target) }));
//     menu.append(new MenuItem({ label: 'Delete', click: () => deleteModule(target) }));

//     menu.popup({ window: require('@electron/remote').getCurrentWindow() });
// }
