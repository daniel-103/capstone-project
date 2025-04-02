const templateData = {
    name: 'Novel Project',
    image: '../../assets/images/Novel.jpg',
    description: 'Draft your next novel',
    files: [
        {
            type: 'folder',
            document: {
                name: "Chapters",
                type: "folder",
                parentId: null,
                childrenIds: [],
                date: {
                    created: new Date(),
                    last: new Date(),
                },
            },
            children: [
                {
                    type: 'file',
                    document: {
                        parentId: null,
                        type: 'file',
                        name: 'chapter 1',
                        fileType: 'textDocument',
                        textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\t\\tChapter 1: [Chapter Title]\\n\\n\\t\\t\\t\\t[Write the opening scene here...]\\n\\t\\t\\t\\n\"}]}"
                    }
                },
                {
                    type: 'file',
                    document: {
                        parentId: null,
                        type: 'file',
                        name: 'chapter 2',
                        fileType: 'textDocument',
                        textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\t\\tChapter 2: [Chapter Title]  \\n\\n\\t\\t\\t\\t[Continue the story here...]  \\n\\n\\t\\t\\t\\t- How does the protagonist react to the events of Chapter 1?  \\n\\t\\t\\t\\t- Introduce a new conflict or complication.  \\n\\t\\t\\t\\t- Show character development through dialogue or action.  \\n\\t\\t\\t\\n\"}]}"
                    }
                },
                {
                    type: 'file',
                    document: {
                        parentId: null,
                        type: 'file',
                        name: 'chapter 3',
                        fileType: 'textDocument',
                        textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\t\\tChapter 3: [Chapter Title]  \\n\\n\\t\\t\\t\\t[Continue the story here...]  \\n\\n\\t\\t\\t\\t- Escalate the tension or deepen the mystery.  \\n\\t\\t\\t\\t- Introduce a subplot or secondary character.  \\n\\t\\t\\t\\t- Foreshadow upcoming events. \\n\\t\\t\\t\\n\"}]}"
                    }
                },
            ]
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'outline',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tTitle: [Your Novel Title]\\n\\n\\t\\t\\t1. Act 1 - Introduction & Setup  \\n\\t\\t\\t2. Act 2 - Rising Action & Conflict  \\n\\t\\t\\t3. Act 3 - Climax & Resolution  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'characters',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tName: [Character Name]  \\n\\t\\t\\tRole: [Protagonist, Antagonist, etc.]  \\n\\t\\t\\tAge: [Age]  \\n\\t\\t\\tAppearance: [Physical Description]  \\n\\t\\t\\tPersonality: [Traits]  \\n\\t\\t\\tBackground: [Backstory]  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'worldbuilding',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tSetting: [Location/Time Period]  \\n\\t\\t\\tCulture: [Customs, Traditions]  \\n\\t\\t\\tMagic System (if applicable): [Rules, Limitations]  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'notes',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tTitle: [Your Novel Title]  \\n\\t\\t\\tGenre: [Fantasy, Sci-Fi, Mystery, etc.]  \\n\\t\\t\\tMain Theme: [Revenge, Love, Redemption, etc.]  \\n\\t\\t\\tTone/Mood: [Dark, Lighthearted, Dramatic, etc.]  \\n\\n\\t\\t\\tKey Plot Points:  \\n\\t\\t\\t- [Major event 1]  \\n\\t\\t\\t- [Major event 2]  \\n\\t\\t\\t- [Major event 3]  \\n\\n\\t\\t\\tInspirations:  \\n\\t\\t\\t- [Books, Movies, Real-life events, etc.]  \\n\\n\\t\\t\\tWriting Goals:  \\n\\t\\t\\t- Daily word count target: [e.g., 1000 words/day]  \\n\\t\\t\\t- Completion deadline: [Date]  \\n\\t\\t\\n\"}]}"
            }
        },
        
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