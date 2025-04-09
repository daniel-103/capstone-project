import templateData from "../template/template_types/emptyTemplate.js";
import getFileOptions from "../template/getFileOptions.js"
// this ensures that a doc with ID entityTypes always exists (when you open the app)
async function initEntityTypes() {
    try {
        const entityTypes = await window.top.db.get('entityTypes');
        if (entityTypes.error) {
            await addEntityTypes();
        }
    } catch(err) {
        await addEntityTypes();
    }
}

async function addEntityTypes() {
        let someTypes = await getFileOptions(templateData);
        someTypes = JSON.stringify(someTypes);

        const typeInfo = {
            _id: 'entityTypes',
            entityTypes: someTypes
        }
        const result = await window.top.db.put(typeInfo);
        console.log("result: ", result);
}

await initEntityTypes();
