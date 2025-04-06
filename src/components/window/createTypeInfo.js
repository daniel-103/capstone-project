import templateData from "../template/template_types/emptyTemplate.js";
import getFileOptions from "../template/getFileOptions.js"
// this ensures that a doc with ID entityTypes always exists (when you open the app)
async function initEntityTypes() {
    
    try {
        const entityTypes = await window.top.db.get('entityTypes');
    } catch(err) {
        let someTypes = await getFileOptions(templateData);
        someTypes = JSON.stringify(someTypes);

        const typeInfo = {
            _id: 'entityTypes',
            entityTypes: someTypes
        }
        await window.top.db.put(typeInfo);
    }
}

await initEntityTypes();
