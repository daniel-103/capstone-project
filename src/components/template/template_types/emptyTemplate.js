const templateData = {
    name: 'Empty Project',
    image: '../../assets/images/Short Story.jpg',
    description: 'Start from scratch',
    files: [
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'story',
                fileType: 'textDocument',
                sections: [],
                textData: '{}',
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