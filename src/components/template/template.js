const templates = [
	{ id: 1, title: 'Short Story', image: '../../assets/images/Short Story.jpg', description: 'Start a new short story' },
	{ id: 2, title: 'Novel', image: '../../assets/images/Novel.jpg', description: 'Draft your next novel' },
	{ id: 3, title: 'Poem', image: '../../assets/images/Poem.jpg', description: 'Write a poem' },
	{ id: 4, title: 'Script', image: '../../assets/images/Script.jpg', description: 'Create a script' },
    { id: 5, title: 'Flash Fiction', image: '../../assets/images/Flash Fiction.jpg', description: 'Write a flash fiction piece' },
    { id: 6, title: 'Memoir', image: '../../assets/images/Memoir.jpg', description: 'Compose a memoir' },
    { id: 7, title: 'Fairy Tale', image: '../../assets/images/Fairy Tale.jpg', description: 'Create a fairy tale' },
    { id: 8, title: 'Myth', image: '../../assets/images/Myth.jpg', description: 'Write a myth' },
    { id: 9, title: 'Fable', image: '../../assets/images/Fable.jpg', description: 'Compose a fable' },
    { id: 10, title: 'Autobiography', image: '../../assets/images/Autobiography.jpg', description: 'Write a autobiography' },	
];
	
const gallery = document.getElementById('templateGallery');

async function initialize() {
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
		};
		gallery.appendChild(card);
	});
}

initialize();