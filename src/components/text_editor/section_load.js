import { createSection } from "./text_editor.js";

export async function loadSections() {
    try {
        const projectId = localStorage.getItem('projectId');
        if (!projectId) {
            console.error("No project ID found in localStorage.");
            return;
        }

        // get the current project
        let projectDoc = await window.top.db.get(projectId).catch(err => null);
        for (const section of projectDoc.sections) {
            // if (sectionsArray.length == 0 || section == null) {
            //     break;
            // }
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