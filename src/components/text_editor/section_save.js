import { sections as sectionArray } from "./text_editor.js" ;

/* 
Sections: 
<<Array>object>

sectionXX:
<object>

    sID:

    startInd:

    endInd:

    parent:

    children: 


*/


export async function saveSections(sectionsArray) {
    try {
        // Check if the "sections" document already exists
        let sectionsDoc = await window.top.db.get('sections').catch(err => null);

        if (sectionsDoc) {
            // If it exists, update the sections array
            sectionsDoc.sections = sectionsArray;
        } else {
            // Create a new document if it doesn't exist
            sectionsDoc = {
                _id: 'sections',
                sections: sectionsArray
            };
        }

        // Save or update the document
        const response = await window.top.db.put({...sectionsDoc, sections: sectionsArray});
        console.log("Sections saved successfully", response);
    } catch (err) {
        console.error("Error saving sections:", err);
    }
}

export async function getSections() {
    try {
        const sectionsDoc = await window.top.db.get('sections');
        console.log("Retrieved sections:", sectionsDoc.sections);
        return sectionsDoc.sections;
    } catch (err) {
        console.error("Error retrieving sections:", err);
        return [];
    }
}


