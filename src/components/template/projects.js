const projects = [
    {id: 1, title: 'Project 1', description:'Short Story Project'},
    {id: 2, title: 'Project 2', description:'Novella Project'},
    {id: 3, title: 'Project 3', description:'Horror mini-series Project'},
    {id: 4, title: 'Project 4', description:'15-book series Project'}
];

const project_gallery = document.getElementById('projectGallery');

projects.forEach(template => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="template-image" style="background-image: url('${template.image}');"></div>
      <div class="template-title">${template.title}</div>
      <div class="template-description">${template.description}</div>
    `;
    card.onclick = () => {
      const windowIframe = window.parent.document.getElementById('window');
      windowIframe.src = 'components/window/window.html';
        // window.parent.injectTheme(windowIframe);

      // window.location.href = '../../index.html';
    };
    project_gallery.appendChild(card);
  });

