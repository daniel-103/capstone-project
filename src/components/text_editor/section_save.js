//import { sections as sectionArray } from "./text_editor.js" ;

export async function saveSections(sectionsArray) {
    
    try {
        const projectId = localStorage.getItem('projectId');
        if (!projectId) {
            console.error("No project ID found in localStorage.");
            return;
        }
        // get the current project
        let projectDoc = await window.top.db.get(projectId).catch(err => null);
        
        // Check if the sections array has actually changed
        //if (JSON.stringify(projectDoc.sections) !== JSON.stringify(sectionsArray)) {
            // Update the sections array
            projectDoc.sections = sectionsArray;

            // Save the updated document with _rev to preserve the revision history
            const response = await window.top.db.put({
                ...projectDoc, // Spread the existing document to preserve other fields (including _rev)
                _rev: projectDoc._rev, // Ensure the _rev is included to prevent conflicts
            });

            console.log(`Sections updated for Project ${projectId}`, response);
        //} else {
        //    console.log("No changes to the sections array. No update needed.");
        //}

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


