document.addEventListener('DOMContentLoaded', () => {
    // Start the tour
    document.getElementById('start-tour-btn').addEventListener('click', function () {
        introJs().start();
    });
});