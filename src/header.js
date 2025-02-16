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
  });
}

// File
//      Save

// 		Save as
const exportButton = document.getElementById("file-save-as-btn")


//		Settings
const settingsButton = document.getElementById("file-settings-btn");
settingsButton.addEventListener("click", () => {
	document.getElementById("overlay").classList.toggle("open")
})


// View
//      Zoom in

// 		Zoom out

//      Reset

// Insert
//      Image

// 		Table

//      Drawing

// 		Chart

// Format
//      Headers & Footers

// 		Page numbers

//      Drowing

// 		Chart

// Tools
//      Spelling & Grammer

// 		Word Count

//      Find File