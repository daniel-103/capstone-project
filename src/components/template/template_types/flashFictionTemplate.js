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