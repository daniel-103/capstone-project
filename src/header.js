const mainWindow = window.top.document.getElementById('window')
const headerOptions = document.getElementById('header-options');
const overlay = document.getElementById("overlay");

for (const dropdownOption of headerOptions.children) {
	const openDropdownButton = dropdownOption.querySelector("button");
	const dropdown = dropdownOption.querySelector(".header-dropdown-wrapper");

	// Click button, open dropdown
	openDropdownButton.addEventListener("click", () => {
		dropdown.classList.toggle("open");
		openDropdownButton.classList.toggle("open");
	});
	
	// Handle mouse leaving the button
	openDropdownButton.addEventListener("mouseleave", (event) => {
		if (!dropdown.contains(event.relatedTarget) && dropdown.classList.contains("open")) {
			dropdown.classList.remove("open");
			openDropdownButton.classList.remove("open");
		}
	});
	
	if (dropdown) {
		// Handle mouse leaving the dropdown
		dropdown.addEventListener("mouseleave", (event) => {
			if (!openDropdownButton.contains(event.relatedTarget) && dropdown.classList.contains("open")) {
				dropdown.classList.remove("open");
				openDropdownButton.classList.remove("open");
			}
		});
	}

	for (const foldoutOption of dropdownOption.querySelectorAll(".option-foldout")) {
		const openFoldoutButton = foldoutOption.querySelector("button");
		const foldout = foldoutOption.querySelector(".foldout-wrapper");

		// Click button, open foldout
		openFoldoutButton.addEventListener("click", () => {
			foldout.classList.toggle("open");
			openFoldoutButton.classList.toggle("open");
		});
		
		// Handle mouse leaving the button
		openFoldoutButton.addEventListener("mouseleave", (event) => {
			if (!foldout.contains(event.relatedTarget) && foldout.classList.contains("open")) {
				foldout.classList.remove("open");
				openFoldoutButton.classList.remove("open");
			}
		});
		
		// Handle mouse leaving the foldout
		foldout.addEventListener("mouseleave", (event) => {
			if (!openFoldoutButton.contains(event.relatedTarget) && foldout.classList.contains("open")) {
				foldout.classList.remove("open");
				openFoldoutButton.classList.remove("open");
			}
		});
	}
}

// Button functionality

// Logo

const redirectButton = document.getElementById('logo-btn');
const windowIframe = document.getElementById('window');


redirectButton.addEventListener('click', () => {
	overlay.classList.remove("open");
	if (redirectButton && windowIframe) {
		windowIframe.src = 'components/template/template.html';
		window.top.tabs = [];
	}
});

// File
//      Save
const saveButton = document.getElementById("file-save-btn");

saveButton.addEventListener("click", () => {
	// Access the 'window' iframe
	const windowIframe = document.getElementById("window");

	if (windowIframe && windowIframe.contentWindow) {
		// Access the 'textEditorIframe' inside the 'window' iframe
		const textEditorIframe = windowIframe.contentWindow.document.getElementById("textEditorIframe");

		if (textEditorIframe) {
			// Now you can interact with the 'textEditorIframe'
			textEditorIframe.contentWindow.postMessage({ action: "save-document" }, "*");
		} else {
			console.error("textEditorIframe not found inside the window iframe.");
		}
	} else {
		console.error("window iframe not found or inaccessible.");
	}
});

// 		Save as
const exportButton = document.getElementById("file-save-as-btn")

// 		Open
const openButton = document.getElementById("file-open-btn")
openButton.addEventListener("click", () => {
	if (mainWindow.src.includes('template.html')) {
		window.top.notify('error', 'You can only import pages to an open project. Please open a project to import a page.', 8);
		return;
	}
	openOverlay("components/header-menus/open-file.html")
})

//		Settings
const settingsButton = document.getElementById("file-settings-btn");
settingsButton.addEventListener("click", () => {
	openOverlay("components/header-menus/settings.html")
})

// Project Types 
const projectTypesButton = document.getElementById("file-project-types-btn");
projectTypesButton.addEventListener("click", () => {
	if (mainWindow.src.includes('template.html')) {
		window.top.notify('error', 'Can only view type settings for an open project.', 8);
		return;
	}
	openOverlay("components/header-menus/pageTypes/pageTypes.html")
})


// If a header button needs to open a menu, open it with this.
function openOverlay(fileSrc) {
	// close any header options
	closeHeaderDropDowns()

	// menu is open, close it then try again
	if (overlay.classList.contains("open")) {
		overlay.classList.remove("open");

		// trying to reopen same menu, toggle
		if (overlay.src.includes(fileSrc)) return;

		// open new menu after waiting for prev menu to close
		setTimeout(() => {
			openOverlay(fileSrc);
		}, 200)

		return;
	}

	// menu isn't open, open it
	overlay.src = fileSrc;
	overlay.classList.add("open")
	overlay.addEventListener("load", () => {
		window.top.injectTheme(overlay.contentDocument);
	});
}

function closeHeaderDropDowns() {
	for (const headerOption of document.getElementsByClassName("header-option")) {
		headerOption.querySelector('button').classList.remove("open");
		headerOption.querySelector('.header-dropdown-wrapper').classList.remove("open");
	}
}

// Zoom In & Zoom Out & Reset

// Get buttons
const zoomInBtn = document.getElementById("view-zoom-in-btn");
const zoomOutBtn = document.getElementById("view-zoom-out-btn");
const resetZoomBtn = document.getElementById("view-reset-zoom-btn");

const appRoot = window.top.document.documentElement; // Target the root <html> element
const body = window.top.document.body; // Target the <body> element

let currentZoom = 1; // Default zoom level
const zoomStep = 0.1; // Zoom step for each button click
const maxZoom = 2; // Maximum zoom level
const minZoom = 0.5; // Minimum zoom level

// Function to apply zoom
function applyZoom() {
    appRoot.style.transform = `scale(${currentZoom})`;
    appRoot.style.transformOrigin = "top left"; // Keep scaling consistent

    // Adjust the size of the root element to maintain scrollability
    appRoot.style.width = `${100 * currentZoom}%`;
    appRoot.style.height = `${100 * currentZoom}%`;

    // Ensure the body is scrollable
	console.log(body);
    body.style.overflowX = "auto"; // Enable horizontal scrolling
    body.style.overflowY = "auto"; // Enable vertical scrolling
    appRoot.style.overflow = "visible"; // Ensure the root element doesn't clip content
}

// Zoom In
zoomInBtn.addEventListener("click", () => {
    if (currentZoom < maxZoom) {
        currentZoom += zoomStep;
        applyZoom();
    }
});

// Zoom Out
zoomOutBtn.addEventListener("click", () => {
    if (currentZoom > minZoom) {
        currentZoom -= zoomStep;
        applyZoom();
    }
});

// Reset Zoom
resetZoomBtn.addEventListener("click", () => {
    currentZoom = 1;
    applyZoom();
});

// Keyboard Shortcuts for Zoom
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey) {
        switch (event.key) {
            case "+":
                if (currentZoom < maxZoom) {
                    currentZoom += zoomStep;
                    applyZoom();
                }
                event.preventDefault(); // Prevent browser zoom
                break;
            case "-":
                if (currentZoom > minZoom) {
                    currentZoom -= zoomStep;
                    applyZoom();
                }
                event.preventDefault(); // Prevent browser zoom
                break;
            case "0":
                currentZoom = 1;
                applyZoom();
                event.preventDefault(); // Prevent browser zoom reset
                break;
        }
    }
});