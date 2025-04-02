import addDocs from "./addDocs.js";
import getFileOptions from "./getFileOptions.js";

async function initProjectFromTemplate(template) {
    const date = new Date();
    const fileOptions = await getFileOptions(template);

    const project = {
        name: template.name,
        type: "folder",
        parentId: null,
        image: template.image,
        description: template.description,
        childrenIds: [],
        fileOptions: JSON.stringify(fileOptions),
        date: {created: date, last: date},
        
    };

    const newProject = await window.top.db.post(project);
    const parent = await window.top.db.get(newProject.id);
    await addDocs(template.files, parent);
    return newProject.id;
}

export default initProjectFromTemplate;