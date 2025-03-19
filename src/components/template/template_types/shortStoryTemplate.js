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
            
        ]
    }

export default templateData;