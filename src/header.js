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

		console.log(openFoldoutButton)
		console.log(foldout)

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
// File
//      Save

// 		Save as
const exportButton = document.getElementById("file-save-as-btn")

//		Settings

// 		Preferences

// Edit
//		Undo

//		Redo

//		Cut

//      Copy

// 		Paste

//      Find

// 		Replace

// View
//      Zoom in

// 		Zoom out

//      Reset

// 		Themes
document.getElementById('view-theme-btn').addEventListener('click', () => {
	if (localStorage.getItem('theme') === 'assets/themes/dark.css') {
		localStorage.setItem('theme', 'assets/themes/spaceDust.css');
	} else {
		localStorage.setItem('theme', 'assets/themes/dark.css');
	}
	injectTheme(document);
	console.log('Theme changed');
	location.reload();
});

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