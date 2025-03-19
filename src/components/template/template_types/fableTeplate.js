const templateData = {
    name: 'Fable Project',
    image: '../../assets/images/Fable.jpg',
    description: 'Compose a fable',
    files: [
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'fable',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tOne day, [Animal Character] met [Another Character]...  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'characters',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tMain Character (Animal or Person):  \\n\\t\\t\\t- Name: [Character Name]  \\n\\t\\t\\t- Species/Type: [Fox, Turtle, Wise Old Man, etc.]  \\n\\t\\t\\t- Personality Traits: [Clever, Foolish, Kind, Greedy, etc.]  \\n\\t\\t\\t- Strengths: [What are they good at?]  \\n\\t\\t\\t- Weaknesses: [What flaw leads to the lesson of the fable?]  \\n\\n\\t\\t\\tSupporting Character(s):  \\n\\t\\t\\t- Name: [Character Name]  \\n\\t\\t\\t- Species/Type: [Rabbit, Lion, Farmer, etc.]  \\n\\t\\t\\t- Role in the Story: [Helper, Trickster, Rival, Wise Guide, etc.]  \\n\\n\\t\\t\\tMoral Alignment:  \\n\\t\\t\\t- Who is right and who is wrong? [Example: The patient tortoise vs. the arrogant hare]  \\n\\n\\t\\t\\tMoral of the Story:  \\n\\t\\t\\t[What lesson does this fable teach? Example: “Slow and steady wins the race.”]  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'moral',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tMoral: [What is the lesson of this fable?]  \\n\\t\\t\\n\"}]}"
            }
        }
    ]
}

export default templateData;