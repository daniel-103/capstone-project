const mainWindow = window.top.document.getElementById('window')
const headerOptions = document.getElementById('header-options');

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
	
	// Handle mouse leaving the dropdown
	dropdown.addEventListener("mouseleave", (event) => {
		if (!openDropdownButton.contains(event.relatedTarget) && dropdown.classList.contains("open")) {
			dropdown.classList.remove("open");
			openDropdownButton.classList.remove("open");
		}
	});

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

if (redirectButton && windowIframe) {
    redirectButton.addEventListener('click', () => {
        windowIframe.src = 'components/template/template.html';
		window.top.tabs = [];
        // window.top.injectTheme(window.top.document);
        // windowIframe.contentWindow.addEventListener('DOMContentLoaded', () => {
        //     console.log('loaded')
        // })
    });
}

// File
//      Save

// 		Save as
const exportButton = document.getElementById("file-save-as-btn")

// 		Open
const openButton = document.getElementById("file-open-btn")
openButton.addEventListener("click", () => {
	if (mainWindow.src.includes('template.html')) {
		window.top.error('[ERROR] Can only import pages to an open project. Please open a project to import a page.', 8);
		return;
	}
	openOverlay("components/header-menus/open-file.html")
})

//		Settings
const settingsButton = document.getElementById("file-settings-btn");
settingsButton.addEventListener("click", () => {
	openOverlay("components/header-menus/settings.html")
})



// If a header button needs to open a menu, open it with this.
const overlay = document.getElementById("overlay");
function openOverlay(fileSrc) {
	// menu is open, close it then try again
	if (overlay.classList.contains("open")) {
		overlay.classList.remove("open");

		setTimeout(() => {
			if (overlay.src.includes(fileSrc)) {
				overlay.classList.remove("open")
				return
			}
			openOverlay(fileSrc);
		}, 200)
		return;
	}

	// menu isn't open, open it
	overlay.src = fileSrc;
	overlay.classList.add("open")
	
	// close any header options
	for (const headerOption of document.getElementsByClassName("header-option")) {
		headerOption.querySelector('button').classList.remove("open");
		headerOption.querySelector('.header-dropdown-wrapper').classList.remove("open");
	}
}