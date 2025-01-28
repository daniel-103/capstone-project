const templates = [
	{ id: 1, title: 'Short Story', image: '../../assets/images/Short Story.jpg', description: 'Start a new short story' },
	{ id: 2, title: 'Novel', image: '../../assets/images/Novel.jpg', description: 'Draft your next novel' },
	{ id: 3, title: 'Poem', image: '../../assets/images/Poem.jpg', description: 'Write a poem' },
	{ id: 4, title: 'Script', image: '../../assets/images/Script.jpg', description: 'Create a script' }
];
	
const gallery = document.getElementById('templateGallery');

const programId = 'Skriptor'

async function initialize() {
	let programObject
	//await window.top.db.remove(programId)

	// This is creating the 'Program Object' that keeps track of all of the projects. It's the highest level object. (the root)
	try {
		// Try to get the existing project data
		programObject = await window.top.db.get(programId);
		console.warn('Checking Master Project Object');
		if (!programObject.error) {
			console.warn('All good :D\nHere it is:', programObject);
		} else {
			// If the project doesn't exist, create a new one
			console.warn("It brokey. Creating a new one...");
			programObject = await window.top.db.put({
				_id: programId,
				projects: []
			});
			console.warn('Ok, it fixed now :D\nHere it is:', programObject);
		}
	} catch (err) {
		console.error("shit's fucked:", err);
	}

	templates.forEach(template => {
		const card = document.createElement('div');
		card.className = 'template-card';
		card.innerHTML = `
			<div class="template-image" style="background-image: url('${template.image}');"></div>
			<div class="template-title">${template.title}</div>
			<div class="template-description">${template.description}</div>
		`;
		card.onclick = async () => {
			const windowIframe = window.parent.document.getElementById('window');
			windowIframe.src = 'components/window/window.html';

			// Load the project template
			// try {
			// Project root, it's id determines the project id
			console.log('test')
			window.top.db.put({
				_id: "123",
				name: "NewWorldMain",
				type: "folder",
				parentId: null,
				childrenIds: [
					"file1-0987654321",
					"Characters-1234123412"
				],
				date: {
					created: "",
					last: ""
				}
			})
			// Append project id to the program's projects
			.then(async (newProj) => {
				console.log(newProj)
				programObject = await window.top.db.get(programId);
				programObject.projects.push(newProj.id);
				await window.top.db.put(programObject);
				console.log("updated program's projects");
			}).catch(err => {
				console.error('Error posting new project:', err);
			})
			// } catch (err) {
			// 	console.error("couldn't initialize project:", err)
			// }
			
		};
		gallery.appendChild(card);
	});
}

initialize();