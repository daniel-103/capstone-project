const templateData = {
    name: 'Myth Project',
    image: '../../assets/images/Myth.jpg',
    description: 'Write a myth',
    files: [
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'myth',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tLong ago, the gods created...  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'deities',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tGod/Goddess Name: [Name]  \\n\\t\\t\\tDomain: [Sky, Ocean, War, etc.]  \\n\\t\\t\\tMythological Role: [Trickster, Creator, Destroyer]  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'origins',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tTitle: [Name of the Myth]  \\n\\n\\t\\t\\t**The Origin of [Concept/Phenomenon]:**  \\n\\t\\t\\t[What does this myth explain? Example: The creation of the world, the birth of the sun, why seasons change, etc.]  \\n\\n\\t\\t\\t**The Beginning:**  \\n\\t\\t\\tIn the time before time, when the world was [empty/chaotic/dark], [Prime Deity or Force] shaped the heavens and the earth...  \\n\\n\\t\\t\\t**The Divine Conflict or Creation Event:**  \\n\\t\\t\\t[Describe a great struggle, war, or event that led to the creation of something significant—gods fighting, a hero emerging, or a powerful sacrifice.]  \\n\\n\\t\\t\\t**The Consequences:**  \\n\\t\\t\\t[How did the world change? What laws of nature, customs, or traditions were established because of this myth?]  \\n\\n\\t\\t\\t**The Legacy:**  \\n\\t\\t\\t[How do people honor or remember this story today? Festivals, rituals, sacred places, etc.]  \\n\\t\\t\\n\"}]}"
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