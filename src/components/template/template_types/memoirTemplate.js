const templateData = {
    name: 'Memoir Project',
    image: '../../assets/images/Memoir.jpg',
    description: 'Compose a memoir',
    files: [
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'chapters',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tChapter 1: [Memory/Event Title]  \\n\\n\\t\\t\\t[Begin recounting the memory...]\\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'timeline',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\t- [Year]: [Significant Life Event]  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'notes',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tWhy is this memory important?  \\n\\t\\t\\tWhat emotions does it bring up?  \\n\\t\\t\\n\"}]}"
            }
        }
    ]
}

export default templateData;