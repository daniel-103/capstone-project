import addNewFileOptions from "../hierarchy/addNewFileOptions.js";
async function addFileOption(entityData) {
    const projectId = localStorage.getItem('projectId');
    
    // Get fresh copies of documents with retry logic
    let project;
    let allTypes;
    try {
        [project, allTypes] = await Promise.all([
            window.top.db.get(projectId),
            window.top.db.get('entityTypes')
        ]);
    } catch (error) {
        console.error('Initial document fetch failed:', error);
        return;
    }

    const newName = entityData.name ? entityData.name : entityData.modules[0].value[0];
    const newType = {
        id: `btn-new-${newName.toLowerCase().replace(/\s+/g, '-')}`,
        title: `Create a new ${newName} Page`,
        name: `${newName} Page`,
        sourcePath: "../base_page/base_page.html",
        data: { default: entityData }
    };

    // Helper function for safe document updates
    const updateWithRetry = async (doc, updates) => {
        let attempts = 0;
        while (attempts < 3) {
            try {
                const newDoc = { ...doc, ...updates, _rev: doc._rev };
                await window.top.db.put(newDoc);
                return true;
            } catch (error) {
                // Refresh document and retry
                doc = await window.top.db.get(doc._id);
                attempts++;
                
            }
        }
        return false;
    };

    try {
        // Update project fileOptions
        const currOptions = JSON.parse(project.fileOptions);
        if (!currOptions.some(t => t.id === newType.id)) {
            currOptions.push(newType);
            const updateSuccess = await updateWithRetry(project, {
                fileOptions: JSON.stringify(currOptions)
            });

            if (!updateSuccess) {
                throw new Error('Failed to update project after 3 attempts');
            }

            // Refresh project document after update
            project = await window.top.db.get(projectId);
        }

        // Update entityTypes
        const entityTypes = JSON.parse(allTypes.entityTypes);
        if (!entityTypes.some(t => t.id === newType.id)) {
            entityTypes.push(newType);
            const typesUpdateSuccess = await updateWithRetry(allTypes, {
                entityTypes: JSON.stringify(entityTypes)
            });

            if (!typesUpdateSuccess) {
                throw new Error('Failed to update entityTypes after 3 attempts');
            }
        }

        // Update listing of project file types
        const updateFileOptionsEvent = new CustomEvent('updateFileOptions', {
            detail: { data: project.fileOptions }
        });
        window.top.dispatchEvent(updateFileOptionsEvent);

    } catch (error) {
        console.error('Failed to add file option:', error);
        throw error;
    }
}

export default addFileOption;