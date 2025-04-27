import { createSection } from "./text_editor.js";


export async function loadSections(entityData) {
    try {
        
        const sections = entityData.sections;
        await recLoadSections(sections);
        

    } catch (err) {
        console.error("Failed to load sections",err);
    }
}

async function recLoadSections (sectionArray) {
    for (const section of sectionArray) {
        createSection(section);
        if (section.children.length != 0) {
            recLoadSections(section.children);
        }
    }

}