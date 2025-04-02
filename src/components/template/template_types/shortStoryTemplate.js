const templateData = {
        name: 'Short Story Project',
        image: '../../assets/images/Short Story.jpg',
        description: 'Start a new short story',
        files: [
            {
                type: 'file',
                document: {
                    parentId: null,
                    type: 'file',
                    name: 'story',
                    fileType: 'textDocument',
                    textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tTitle: [Your Short Story Title]\\n\\t\\t\\t\\n\\t\\t\\tOnce upon a time...\\n\\t\\t\\n\"}]}"
                }
            },
            {
                type: 'file',
                document: {
                    parentId: null,
                    type: 'file',
                    name: 'outline',
                    fileType: 'textDocument',
                    textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tTitle: [Your Short Story Title] \\n\\t\\t\\t1. Introduction - Setting & Characters \\n\\t\\t\\t2. Conflict - What problem arises? \\n\\t\\t\\t3. Climax - The turning point \\n\\t\\t\\t4. Resolution - How does it end?\\n\\t\\t\\n\"}]}"
                }
            },
            {
                type: 'file',
                document: {
                    parentId: null,
                    type: 'file',
                    name: 'characters',
                    fileType: 'textDocument',
                    textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tCharacter Name: [Name]  \\n\\t\\t\\tRole: [Protagonist/Antagonist/Side Character]  \\n\\t\\t\\tDescription: [Appearance, Personality, Motivation]  \\n\\t\\t\\n\"}]}"
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