import initProjectFromTemplate from "./initProjectFromTemplate.js";
import autobiographyTemplate from "./template_types/autobiographyTemplate.js"
import fableTeplate from "./template_types/fableTeplate.js"
import fairyTaleTemplate from "./template_types/fairyTaleTemplate.js"
import flashFictionTemplate from "./template_types/flashFictionTemplate.js"
import memoirTemplate from "./template_types/memoirTemplate.js"
import mythTemplate from "./template_types/mythTemplate.js"
import novelTemplate from "./template_types/novelTemplate.js"
import poemTemplate from "./template_types/poemTemplate.js"
import scriptTemplate from "./template_types/scriptTemplate.js"
import shortStoryTemplate from "./template_types/shortStoryTemplate.js"

const templates = [
	autobiographyTemplate,
	fableTeplate,
	fairyTaleTemplate,
	flashFictionTemplate,
	memoirTemplate,
	mythTemplate,
	novelTemplate,
	poemTemplate,
	scriptTemplate,
	shortStoryTemplate,
];

const gallery = document.getElementById('templateGallery');

async function initialize() {
	templates.forEach(template => {
		const card = document.createElement('div');
		card.className = 'template-card';
		card.innerHTML = `
			<div class="template-image" style="background-image: url('${template.image}');"></div>
			<div class="template-title">${template.name}</div>
			<div class="template-description">${template.description}</div>
		`;
		card.onclick = async () => {
			const projectId = await initProjectFromTemplate(template);
			console.log("templateid: ", projectId);
			localStorage.setItem('projectId', projectId);
			const windowIframe = window.parent.document.getElementById('window');
            windowIframe.src = `components/window/window.html`;
		};
		gallery.appendChild(card);
	});
};

initialize();