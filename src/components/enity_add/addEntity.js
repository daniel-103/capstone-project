import attachToParent from "../entity_types/attachToParent.js";

async function addEntity(path, entityData, parentId) {
    entityData.parentId = parentId;
    const newEntity = await initNewEntity(entityData);
    path = path + "?id=" + encodeURIComponent(newEntity._id);

    const tabHeader = window.parent.document.getElementById("tab-header");
    const pageWindow = window.parent.document.getElementById("page-window");

    window.parent.addNewTab(`Tab ${window.top.tabs.length + 1}`, path, tabHeader, pageWindow);

}

async function initNewEntity(entityData) {
    const newEntity = await createNewEntity(entityData);

    await attachToParent(entityData.parentId, entityData._id);

    return newEntity;
}

async function createNewEntity(newEntity) {
    if (newEntity._id) {
        newEntity._id = undefined;
        newEntity._rev = undefined;
    }
    const result = await window.top.db.post(newEntity);
    newEntity._rev = result.rev;
    newEntity._id = result.id;

    return newEntity;
}

export default addEntity;