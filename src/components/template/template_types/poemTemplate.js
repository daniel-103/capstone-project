const templateData = {
    name: 'Poem Project',
    image: '../../assets/images/Poem.jpg',
    description: 'Write a poem',
    files: [
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'poem_1',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\t[Your First Poem Title]\\n\\n\\t\\t\\t[Your first stanza...]  \\n\\t\\t\\t[Your second stanza...]  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'poem_2',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\t[Your Second Poem Title]\\n\\n\\t\\t\\t[Your first stanza...]  \\n\\t\\t\\t[Your second stanza...]  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'notes',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tThemes: [Love, Nature, Time, etc.]  \\n\\n\\t\\t\\tStyle: [Free Verse, Haiku, Sonnet, etc.]  \\n\\t\\t\\n\"}]}"
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