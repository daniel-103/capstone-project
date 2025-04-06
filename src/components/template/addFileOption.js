import addNewFileOptions from "../hierarchy/addNewFileOptions.js";

async function addFileOption(entityData) {
    const projectId = localStorage.getItem('projectId');
    const project = await window.top.db.get(projectId);
    const newName = entityData.modules[0].value[0];

    const newType = {
        id: `btn-new-${newName}`,
        title: `Create a new ${newName} Page`,
        name: `${newName} Page`,
        sourcePath: "../base_page/base_page.html",
        data: {default: entityData}
    }

    let currOptions = JSON.parse(project.fileOptions);
    currOptions.push(newType);
    currOptions = JSON.stringify(currOptions);
    project.fileOptions = currOptions;

    const updateFileOptionsEvent = new CustomEvent('updateFileOptions', {
        detail: {
            data: currOptions
        }
    });

    // Add to the listing of all types 
    const allTypes = await window.top.db.get('entityTypes');
    const entityTypes = Array.from(new Set([...allTypes.entityTypes, JSON.stringify(newType)]));
    await window.top.db.put({
        _id: 'entityTypes',
        _rev: allTypes._rev,
        entityTypes: entityTypes
    });

    window.top.dispatchEvent(updateFileOptionsEvent);
    await window.top.db.put(project);
}

export default addFileOption;