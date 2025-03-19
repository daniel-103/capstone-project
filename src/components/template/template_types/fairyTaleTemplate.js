const templateData = {
    name: 'Fairy Tale Project',
    image: '../../assets/images/Fairy Tale.jpg',
    description: 'Create a fairy tale',
    files: [
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'story',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tOnce upon a time in a faraway land...  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'characters',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tMain Character (Hero/Protagonist):  \\n\\t\\t\\tName: [Character Name]  \\n\\t\\t\\tAge: [Young Prince, Clever Peasant, Brave Child, etc.]  \\n\\t\\t\\tPersonality: [Kind, Brave, Curious, etc.]  \\n\\t\\t\\tSpecial Traits: [Magic powers, Cleverness, Kind heart, etc.]  \\n\\t\\t\\tGoal: [What does the hero want?]  \\n\\n\\t\\t\\tVillain/Antagonist:  \\n\\t\\t\\tName: [Character Name]  \\n\\t\\t\\tType: [Wicked Witch, Evil King, Cunning Fox, etc.]  \\n\\t\\t\\tMotivation: [Why are they against the hero?]  \\n\\t\\t\\tWeakness: [How can they be defeated?]  \\n\\n\\t\\t\\tSupporting Characters:  \\n\\t\\t\\t- Name: [Character Name] - Role: [Mentor, Sidekick, Talking Animal, etc.]  \\n\\t\\t\\t- Name: [Character Name] - Role: [Helper, Trickster, Magical Guide, etc.]  \\n\\n\\t\\t\\tMagical Elements:  \\n\\t\\t\\t- Magical Creatures: [Dragons, Fairies, Talking Animals, etc.]  \\n\\t\\t\\t- Enchanted Objects: [Wishing Well, Magic Mirror, Golden Key, etc.]  \\n\\n\\t\\t\\tMoral of the Story:  \\n\\t\\t\\t[What lesson does the fairy tale teach?]  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'moral',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tWhat lesson does this story teach?  \\n\\t\\t\\n\"}]}"
            }
        }
    ]
}

export default templateData;