import addDocs from "./addDocs.js";

async function initProjectFromTemplate(template) {
    const date = new Date();

    const project = {
        name: template.name,
        type: "folder",
        parentId: null,
        image: template.image,
        description: template.description,
        childrenIds: [],
        date: {created: date, last: date},
    };

    const newProject = await window.top.db.post(project);
    const parent = await window.top.db.get(newProject.id);
    await addDocs(template.files, parent);
    return newProject.id;
}

export default initProjectFromTemplate;