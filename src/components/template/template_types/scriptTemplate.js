const templateData = {
    name: 'Script Project',
    image: '../../assets/images/Script.jpg',
    description: 'Create a script',
    files: [
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'script',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tTitle: [Your Script Title]  \\n\\t\\t\\tScreenplay by: [Your Name]  \\n\\n\\t\\t\\tINT. [Location] - [Time of Day]\\n\\n\\t\\t\\t[Action Description]  \\n\\t\\t\\tCHARACTER: (Dialogue)  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'characters',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tCharacter Name: [Name]  \\n\\t\\t\\tRole: [Protagonist, Antagonist, Side Character]  \\n\\t\\t\\tAge: [Age]  \\n\\t\\t\\tGender: [Male/Female/Non-binary]  \\n\\t\\t\\tPersonality: [Traits, Strengths, Weaknesses]  \\n\\t\\t\\tMotivation: [What drives them? What do they want?]  \\n\\t\\t\\tBackstory: [Relevant history that shapes their actions]  \\n\\t\\t\\tDialogue Style: [Formal, Slang-heavy, Sarcastic, etc.]  \\n\\n\\t\\t\\tSupporting Characters:  \\n\\t\\t\\t- Name: [Character Name] - [Brief role description]  \\n\\t\\t\\t- Name: [Character Name] - [Brief role description]  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'scene_list',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\t1. Scene 1 - [Short Description]  \\n\\t\\t\\t2. Scene 2 - [Short Description]  \\n\\t\\t\\n\"}]}"
            }
        },
        {
            type: 'file',
            document: {
                parentId: null,
                type: 'file',
                name: 'notes',
                fileType: 'textDocument',
                textData: "{\"ops\":[{\"insert\":\"\\n\\t\\t\\tTitle: [Your Script Title]  \\n\\t\\t\\tGenre: [Drama, Comedy, Thriller, etc.]  \\n\\t\\t\\tFormat: [Screenplay, Stage Play, Radio Drama, etc.]  \\n\\t\\t\\tTheme: [What central message or idea does the script explore?]  \\n\\t\\t\\tTone/Mood: [Dark, Humorous, Suspenseful, etc.]  \\n\\n\\t\\t\\tLogline:  \\n\\t\\t\\t[A one-sentence summary of the story concept.]  \\n\\n\\t\\t\\tAct Structure:  \\n\\t\\t\\t- **Act 1 (Setup):** [Introduce characters, setting, and conflict]  \\n\\t\\t\\t- **Act 2 (Confrontation):** [Escalate conflict, develop subplots]  \\n\\t\\t\\t- **Act 3 (Resolution):** [Climax and conclusion]  \\n\\n\\t\\t\\tInspirations:  \\n\\t\\t\\t- [Movies, TV shows, books, real-life events, etc.]  \\n\\n\\t\\t\\tWriting Notes:  \\n\\t\\t\\t- [Anything specific to remember while writing the script]  \\n\\t\\t\\n\"}]}"
            }
        }
    ]
}

export default templateData;