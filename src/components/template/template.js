const templates = [
	{ id: 1, title: 'Short Story', image: '../../assets/images/Short Story.jpg', description: 'Start a new short story' },
	{ id: 2, title: 'Novel', image: '../../assets/images/Novel.jpg', description: 'Draft your next novel' },
	{ id: 3, title: 'Poem', image: '../../assets/images/Poem.jpg', description: 'Write a poem' },
	{ id: 4, title: 'Script', image: '../../assets/images/Script.jpg', description: 'Create a script' },
    { id: 5, title: 'Flash Fiction', image: '../../assets/images/Flash Fiction.jpg', description: 'Write a flash fiction piece' },
    { id: 6, title: 'Memoir', image: '../../assets/images/Memoir.jpg', description: 'Compose a memoir' },
    { id: 7, title: 'Fairy Tale', image: '../../assets/images/Fairy Tale.jpg', description: 'Create a fairy tale' },
    { id: 8, title: 'Myth', image: '../../assets/images/Myth.jpg', description: 'Write a myth' },
    { id: 9, title: 'Fable', image: '../../assets/images/Fable.jpg', description: 'Compose a fable' },
    { id: 10, title: 'Autobiography', image: '../../assets/images/Autobiography.jpg', description: 'Write a autobiography' },	
];

const predefinedText = {
    1: {
        'story.txt': `
			Title: [Your Short Story Title]
			
			Once upon a time...
		`,
        'outline.txt': `
			Title: [Your Short Story Title] 
			1. Introduction - Setting & Characters 
			2. Conflict - What problem arises? 
			3. Climax - The turning point 
			4. Resolution - How does it end?
		`,
        'characters.txt': `
			Character Name: [Name]  
			Role: [Protagonist/Antagonist/Side Character]  
			Description: [Appearance, Personality, Motivation]  
		`
    },
    2: {
        'outline.txt': `
			Title: [Your Novel Title]

			1. Act 1 - Introduction & Setup  
			2. Act 2 - Rising Action & Conflict  
			3. Act 3 - Climax & Resolution  
		`,
        'characters.txt': `
			Name: [Character Name]  
			Role: [Protagonist, Antagonist, etc.]  
			Age: [Age]  
			Appearance: [Physical Description]  
			Personality: [Traits]  
			Background: [Backstory]  
		`,
        'worldbuilding.txt': `
			Setting: [Location/Time Period]  
			Culture: [Customs, Traditions]  
			Magic System (if applicable): [Rules, Limitations]  
		`,
        'notes.txt': `
			Title: [Your Novel Title]  
			Genre: [Fantasy, Sci-Fi, Mystery, etc.]  
			Main Theme: [Revenge, Love, Redemption, etc.]  
			Tone/Mood: [Dark, Lighthearted, Dramatic, etc.]  

			Key Plot Points:  
			- [Major event 1]  
			- [Major event 2]  
			- [Major event 3]  

			Inspirations:  
			- [Books, Movies, Real-life events, etc.]  

			Writing Goals:  
			- Daily word count target: [e.g., 1000 words/day]  
			- Completion deadline: [Date]  
		`,
        'Chapters': {
            'chapter_1.txt': `
				Chapter 1: [Chapter Title]

				[Write the opening scene here...]
			`,
            'chapter_2.txt': `
				Chapter 2: [Chapter Title]  

				[Continue the story here...]  

				- How does the protagonist react to the events of Chapter 1?  
				- Introduce a new conflict or complication.  
				- Show character development through dialogue or action.  
			`,
            'chapter_3.txt': `
				Chapter 3: [Chapter Title]  

				[Continue the story here...]  

				- Escalate the tension or deepen the mystery.  
				- Introduce a subplot or secondary character.  
				- Foreshadow upcoming events. 
			`
        }
    },
    3: {
        'poem_1.txt': `
			[Your First Poem Title]

			[Your first stanza...]  
			[Your second stanza...]  

		`,
        'poem_2.txt': `
			[Your Second Poem Title]

			[Your first stanza...]  
			[Your second stanza...]  

		`,
        'notes.txt': `
			Themes: [Love, Nature, Time, etc.]  

			Style: [Free Verse, Haiku, Sonnet, etc.]  
		`
    },
    4: {
        'script.txt': `
			Title: [Your Script Title]  
			Screenplay by: [Your Name]  

			INT. [Location] - [Time of Day]

			[Action Description]  
			CHARACTER: (Dialogue)  
		`,
        'characters.txt': `
			Character Name: [Name]  
			Role: [Protagonist, Antagonist, Side Character]  
			Age: [Age]  
			Gender: [Male/Female/Non-binary]  
			Personality: [Traits, Strengths, Weaknesses]  
			Motivation: [What drives them? What do they want?]  
			Backstory: [Relevant history that shapes their actions]  
			Dialogue Style: [Formal, Slang-heavy, Sarcastic, etc.]  

			Supporting Characters:  
			- Name: [Character Name] - [Brief role description]  
			- Name: [Character Name] - [Brief role description]  
		`,
        'scene_list.txt': `
			1. Scene 1 - [Short Description]  
			2. Scene 2 - [Short Description]  
		`,
        'notes.txt': `
			Title: [Your Script Title]  
			Genre: [Drama, Comedy, Thriller, etc.]  
			Format: [Screenplay, Stage Play, Radio Drama, etc.]  
			Theme: [What central message or idea does the script explore?]  
			Tone/Mood: [Dark, Humorous, Suspenseful, etc.]  

			Logline:  
			[A one-sentence summary of the story concept.]  

			Act Structure:  
			- **Act 1 (Setup):** [Introduce characters, setting, and conflict]  
			- **Act 2 (Confrontation):** [Escalate conflict, develop subplots]  
			- **Act 3 (Resolution):** [Climax and conclusion]  

			Inspirations:  
			- [Movies, TV shows, books, real-life events, etc.]  

			Writing Notes:  
			- [Anything specific to remember while writing the script]  
		`
    },
	5: {
        'story.txt': `
			Title: [Your Flash Fiction Title]  

			[Start with a strong opening line...]
		`,
        'notes.txt': `
			Word Count Limit: [Usually 500-1000 words]  
			Main Theme: [Concept]  
		`
    },
    6: {
        'chapters.txt': `
			Chapter 1: [Memory/Event Title]  

			[Begin recounting the memory...]
		`,
        'timeline.txt': `
			- [Year]: [Significant Life Event]  
		`,
        'notes.txt': `
			Why is this memory important?  
			What emotions does it bring up?  
		`
    },
	7: {
        'story.txt': `
			Once upon a time in a faraway land...  
		`,
        'characters.txt': `
			Main Character (Hero/Protagonist):  
			Name: [Character Name]  
			Age: [Young Prince, Clever Peasant, Brave Child, etc.]  
			Personality: [Kind, Brave, Curious, etc.]  
			Special Traits: [Magic powers, Cleverness, Kind heart, etc.]  
			Goal: [What does the hero want?]  

			Villain/Antagonist:  
			Name: [Character Name]  
			Type: [Wicked Witch, Evil King, Cunning Fox, etc.]  
			Motivation: [Why are they against the hero?]  
			Weakness: [How can they be defeated?]  

			Supporting Characters:  
			- Name: [Character Name] - Role: [Mentor, Sidekick, Talking Animal, etc.]  
			- Name: [Character Name] - Role: [Helper, Trickster, Magical Guide, etc.]  

			Magical Elements:  
			- Magical Creatures: [Dragons, Fairies, Talking Animals, etc.]  
			- Enchanted Objects: [Wishing Well, Magic Mirror, Golden Key, etc.]  

			Moral of the Story:  
			[What lesson does the fairy tale teach?]  
		`,
        'moral.txt': `
			What lesson does this story teach?  
		`
    },
    8: {
        'myth.txt': `
			Long ago, the gods created...  
		`,
        'dieties.txt': `
			God/Goddess Name: [Name]  
			Domain: [Sky, Ocean, War, etc.]  
			Mythological Role: [Trickster, Creator, Destroyer]  
		`,
        'origins.txt': `
			Title: [Name of the Myth]  

			**The Origin of [Concept/Phenomenon]:**  
			[What does this myth explain? Example: The creation of the world, the birth of the sun, why seasons change, etc.]  

			**The Beginning:**  
			In the time before time, when the world was [empty/chaotic/dark], [Prime Deity or Force] shaped the heavens and the earth...  

			**The Divine Conflict or Creation Event:**  
			[Describe a great struggle, war, or event that led to the creation of something significant—gods fighting, a hero emerging, or a powerful sacrifice.]  

			**The Consequences:**  
			[How did the world change? What laws of nature, customs, or traditions were established because of this myth?]  

			**The Legacy:**  
			[How do people honor or remember this story today? Festivals, rituals, sacred places, etc.]  
		`
    },
    9: {
        'fable.txt': `
			One day, [Animal Character] met [Another Character]...  
		`,
        'characters.txt': `
			Main Character (Animal or Person):  
			- Name: [Character Name]  
			- Species/Type: [Fox, Turtle, Wise Old Man, etc.]  
			- Personality Traits: [Clever, Foolish, Kind, Greedy, etc.]  
			- Strengths: [What are they good at?]  
			- Weaknesses: [What flaw leads to the lesson of the fable?]  

			Supporting Character(s):  
			- Name: [Character Name]  
			- Species/Type: [Rabbit, Lion, Farmer, etc.]  
			- Role in the Story: [Helper, Trickster, Rival, Wise Guide, etc.]  

			Moral Alignment:  
			- Who is right and who is wrong? [Example: The patient tortoise vs. the arrogant hare]  

			Moral of the Story:  
			[What lesson does this fable teach? Example: “Slow and steady wins the race.”]  

		`,
        'moral.txt': `
			Moral: [What is the lesson of this fable?]  
		`
    },
    10: {
        'life_story.txt': `
			I was born on [Date] in [Place]...  
		`,
        'timeline.txt': `
			- [Year]: [Important Event]  
 
		`,
        'photos.txt': `
			I was born on [Date] in [Place]...  
		`,
        'reflections.txt': `
			Title: [Your Autobiography Title]  

			**Important Photos & Memories**  

			1. **Childhood:**  
			- Description: [First family photo, childhood home, school days, etc.]  
			- Year: [YYYY]  
			- Location: [City, Country]  
			- Why is this photo significant? [Explain its importance in your life story.]  

			2. **Teenage Years:**  
			- Description: [Graduation, first job, close friends, hobbies, etc.]  
			- Year: [YYYY]  
			- Location: [City, Country]  
			- Memory Attached: [Describe an event related to this photo.]  

			3. **Adulthood:**  
			- Description: [Career milestone, marriage, first home, major achievements, etc.]  
			- Year: [YYYY]  
			- Location: [City, Country]  
			- Reflection: [How did this moment shape who you are today?]  

			4. **Family & Friends:**  
			- Description: [Special gatherings, reunions, vacations, etc.]  
			- Year: [YYYY]  
			- Location: [City, Country]  
			- Significance: [Describe the bond and memories captured in the photo.]  

			5. **Life-Changing Event:**  
			- Description: [A moment that deeply impacted you—good or bad.]  
			- Year: [YYYY]  
			- Location: [City, Country]  
			- How did this event change your perspective or path in life?  

			**Additional Notes:**  
			[List any other meaningful photographs and their importance in your autobiography.]  
		`
    }
};

const gallery = document.getElementById('templateGallery');

async function initialize() {
	templates.forEach(template => {
		const card = document.createElement('div');
		card.className = 'template-card';
		card.innerHTML = `
			<div class="template-image" style="background-image: url('${template.image}');"></div>
			<div class="template-title">${template.title}</div>
			<div class="template-description">${template.description}</div>
		`;
		card.onclick = async () => {
			const windowIframe = window.parent.document.getElementById('window');
			const predefinedTextForTemplate = predefinedText[template.id];
            windowIframe.src = `components/window/window.html?templateId=${template.id}&predefinedText=${encodeURIComponent(JSON.stringify(predefinedTextForTemplate))}`;
		};
		gallery.appendChild(card);
	});
}

initialize();