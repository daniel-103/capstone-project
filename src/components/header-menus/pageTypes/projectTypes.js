// retrieve all project types
const allTypes = await window.top.db.get('entityTypes');



// retrieve currently project types
const projectId = localStorage.getItem('projectId');
const project = await window.top.db.get(projectId);
