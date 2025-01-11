const templates = [
    { id: 1, title: 'Short Story', image: 'images/Short Story.jpg', description: 'Start a new short story' },
    { id: 2, title: 'Novel', image: 'images/Novel.jpg', description: 'Draft your next novel' },
    { id: 3, title: 'Poem', image: 'images/Poem.jpg', description: 'Write a poem' },
    { id: 4, title: 'Script', image: 'images/Script.jpg', description: 'Create a script' }
  ];
  
  const gallery = document.getElementById('templateGallery');
  
  templates.forEach(template => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
      <div class="template-image" style="background-image: url('${template.image}');"></div>
      <div class="template-title">${template.title}</div>
      <div class="template-description">${template.description}</div>
    `;
    card.onclick = () => {
      window.location.href = '../../index.html';
    };
    gallery.appendChild(card);
  });