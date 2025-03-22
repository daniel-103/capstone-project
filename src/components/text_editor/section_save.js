//import { sections as sectionArray } from "./text_editor.js" ;

export async function saveSections(entityData, sectionsArray) {
    
    try {
        
        // Update the sections array
        entityData.sections = sectionsArray;

        // Save the updated document with _rev to preserve the revision history
        const response = await window.top.db.put({
            ...entityData, // Spread the existing document to preserve other fields (including _rev)
            _rev: entityData._rev, // Ensure the _rev is included to prevent conflicts
        });

    } catch (err) {
        console.error("Error saving sections:", err);
    }
}

export async function getSections() {
    try {
        const projectId = localStorage.getItem('projectId');
        const projectDoc = await window.top.db.get(projectId);
        console.log("Retrieved sections:", projectDoc.sections);
        console.log(projectDoc);
        return projectDoc.sections;
    } catch (err) {
        console.error("Error retrieving sections:", err);
        return [];
    }
}


