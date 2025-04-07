window.addEventListener('message', (event) => {
    if (event.data.action === 'startTextEditorTour') {
        introJs().setOptions({
            steps: [
                {
                    element: '.editor-container',
                    intro: "This is the main editor where you can write and edit your content."
                },
                {
                    element: '#counter',
                    intro: "This is the word counter. It keeps track of the number of words in your document."
                },
                {
                    element: '.ql-section-button',
                    intro: 'Click this button to create a new section in your document. Sections help organize your content effectively.'
                },
                {
                    element: '.ql-ai-assistant',
                    intro: "This is the AI Assistant, SkripMancer. Use it to generate ideas or get writing suggestions."
                },
                {
                    element: '.ql-research-button',
                    intro: "This is the Research Tools modal. You can search Wikipedia, Google, or a dictionary for information."
                },
                {
                    element: '.ql-text-to-speech',
                    intro: "This is the Text-to-Speech Audio Player. Use it to listen to your content being read aloud."
                }
            ]
        }).oncomplete(() => {
            // Notify the parent window that the Text Editor tutorial is complete
            window.parent.postMessage({ action: 'textEditorTourComplete' }, '*');
        }).start();
    }
});