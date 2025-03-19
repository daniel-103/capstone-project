const templateData = {
    name: 'Flash Fiction Project',
    image: '../../assets/images/Flash Fiction.jpg',
    description: 'Write a flash fiction piece',
    files: [
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'story',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tTitle: [Your Flash Fiction Title]  \\n\\n\\t\\t\\t[Start with a strong opening line...]\\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'notes',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tWord Count Limit: [Usually 500-1000 words]  \\n\\t\\t\\tMain Theme: [Concept]  \\n\\t\\t\\n\"}]}"
            }
        }
    ]
}

export default templateData;