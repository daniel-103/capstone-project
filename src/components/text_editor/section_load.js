import { createSection } from "./text_editor.js";

export async function loadSections(entityData) {
    try {
        if (!entityData.sections) {
            return;
        }
        
        for (const section of entityData.sections) {
            console.log(section);
            createSection(section);
            if (section.children.length != 0) {
                for (const subsection of section.children) {
                    createSection(subsection);
                }
            }
        }

    } catch (err) {
        console.error("Failed to load sections",err);
    }
}

// export async function showSectionUI(sectionsArray) {
//     try {
        
//         for (const section of sectionsArray) {
//             if (sectionsArray.length == 0 || section == null) {
//                 break;
//             }
//             console.log(section);
//             createSection(section);
            
            
//         }
//     } catch (err) {
//         console.error("Failed to show section UI",err);
//     }
// }