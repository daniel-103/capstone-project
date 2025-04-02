const templateData = {
    name: 'Autobiography Project',
    image: '../../assets/images/Autobiography.jpg',
    description: 'Write an autobiography',
    files: [
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'life_story',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\tI was born on [Date] in [Place], and my early life was shaped by [Event]. I later moved to [Location] to pursue my passion for [Activity].\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'timeline',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\t- [Year]: [Important Event]  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'photos',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tI was born on [Date] in [Place]...  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'reflections',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tTitle: [Your Autobiography Title]  \\n\\n\\t\\t\\t**Important Photos & Memories**  \\n\\n\\t\\t\\t1. **Childhood:**  \\n\\t\\t\\t- Description: [First family photo, childhood home, school days, etc.]  \\n\\t\\t\\t- Year: [YYYY]  \\n\\t\\t\\t- Location: [City, Country]  \\n\\t\\t\\t- Why is this photo significant? [Explain its importance in your life story.]  \\n\\n\\t\\t\\t2. **Teenage Years:**  \\n\\t\\t\\t- Description: [Graduation, first job, close friends, hobbies, etc.]  \\n\\t\\t\\t- Year: [YYYY]  \\n\\t\\t\\t- Location: [City, Country]  \\n\\t\\t\\t- Memory Attached: [Describe an event related to this photo.]  \\n\\n\\t\\t\\t3. **Adulthood:**  \\n\\t\\t\\t- Description: [Career milestone, marriage, first home, major achievements, etc.]  \\n\\t\\t\\t- Year: [YYYY]  \\n\\t\\t\\t- Location: [City, Country]  \\n\\t\\t\\t- Reflection: [How did this moment shape who you are today?]  \\n\\n\\t\\t\\t4. **Family & Friends:**  \\n\\t\\t\\t- Description: [Special gatherings, reunions, vacations, etc.]  \\n\\t\\t\\t- Year: [YYYY]  \\n\\t\\t\\t- Location: [City, Country]  \\n\\t\\t\\t- Significance: [Describe the bond and memories captured in the photo.]  \\n\\n\\t\\t\\t5. **Life-Changing Event:**  \\n\\t\\t\\t- Description: [A moment that deeply impacted you—good or bad.]  \\n\\t\\t\\t- Year: [YYYY]  \\n\\t\\t\\t- Location: [City, Country]  \\n\\t\\t\\t- How did this event change your perspective or path in life?  \\n\\n\\t\\t\\t**Additional Notes:**  \\n\\t\\t\\t[List any other meaningful photographs and their importance in your autobiography.]  \\n\\t\\t\\n\"}]}"
            }
        }
    ],
    fileOptions: [
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
    ]
}

export default templateData;