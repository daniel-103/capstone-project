// this ensures that a doc with ID entityTypes always exists (when you open the app)
async function initEntityTypes() {
    
    try {
        const entityTypes = await window.top.db.get('entityTypes');
    } catch(err) {
        const entityTypes = [
            {
                id: "btn-new-writing",
                title: "Create a new Writing Page",
                name: "Writing Page",
                dataPath: "../entity_types/textDocument.js",
                sourcePath: "../text_editor/text_editor.html",
                data: null
            },
            {
                id: "btn-new-character",
                title: "Create a new Character Page",
                name: "Character Page",
                dataPath: "../entity_types/character.js",
                sourcePath: "../base_page/base_page.html",
                data: null
            },
            {
                id: "btn-new-relationship",
                title: "Create a new Relationship Page",
                name: "Relationship Page",
                dataPath: "../entity_types/relationship.js",
                sourcePath: "../base_page/base_page.html",
                data: null
            }
        ];

        const stringifiedTypes = entityTypes.map((type) => JSON.stringify(type));

        const typeInfo = {
            _id: 'entityTypes',
            entityTypes: stringifiedTypes
        }
        await window.top.db.put(typeInfo);
    }
}

await initEntityTypes();
