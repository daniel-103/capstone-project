document.addEventListener('DOMContentLoaded', () => {
    const tourButton = document.getElementById('project-hub-tour-btn');

    // Attach the event listener to the button
    tourButton.addEventListener('click', function () {
        introJs().setOptions({
            steps: [
                {
                    intro: "Welcome to Skriptor!"
                },
                {
                    intro: "This is the Project Hub! This is where you can manage your projects."
                },
                {
                    element: '#templateGallery',
                    intro: "Here is the gallery of templates you can use."
                },
                {
                    element: '.dropdown',
                    intro: "Use this dropdown to view all your projects."
                },
                {
                    element: '#projectGallery',
                    intro: "This section displays your current projects."
                }
            ]
        }).start();
    });
});