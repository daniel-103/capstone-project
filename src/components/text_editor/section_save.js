//import { sections as sectionArray } from "./text_editor.js" ;

export async function saveSections(sectionsArray, entityData) {
    
    try {
    
        if (JSON.stringify(entityData.sections) != JSON.stringify(sectionsArray)) {
            
            const old_rev = entityData._rev;
            
            entityData.sections = sectionsArray;
            entityData._rev = old_rev;
            console.log("_rev: ",entityData._rev);
            
            const response = await window.top.db.put(entityData);
            
    
            console.log(`Sections updated for page ${entityData.name}`, response);
        } else {
            console.log("No changes to the sections array. No update needed.");
        }

    } catch (err) {
        console.error("Error saving sections:", err);
    }
}

export async function getSections(entityData) {
    try {
        
        console.log("Retrieved sections:", entityData.sections);
        return;
    } catch (err) {
        console.error("Error retrieving sections:", err);
        return;
    }
}

