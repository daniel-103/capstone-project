const errorContainer = window.top.document.getElementById("error-container")

const slideOutTime = 1; // Time in seconds for the ending animation
const progressBarSnapBack = 0.2 // Time in seconds it takes for the progress bar to reset after hovering over the error

window.top.error = async function (message, time = 0) {
    // error body
    const errorDiv = document.createElement("div");
    errorDiv.classList.add('error-message');

    const errorContent = document.createElement("div");
    errorContent.classList.add('error-content')
    errorContent.innerHTML = `<p>${message}</p>`

    // close button
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('error-close-btn');
    closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>';
    closeBtn.addEventListener('click', removeError)
    
    errorContent.appendChild(closeBtn);

    errorDiv.appendChild(errorContent)

    // progress bar
    if (time > 0) {
        let startTime;
        let interval;

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        errorDiv.appendChild(progressBar);

        function startCountdown() {
            startTime = Date.now();
            interval = setInterval(updateProgress, 25);
        }
    
        function updateProgress() {
            const elapsedTime = Date.now() - startTime;
            const percentage = (elapsedTime / time) / 10;
            progressBar.style.width = `${100 - percentage}%`;
    
            if (elapsedTime >= time*1000) {
                clearInterval(interval);
                removeError();
            }
        }
    
        function stopCountdown() {
            clearInterval(interval);
            progressBar.style.transition = `width ${progressBarSnapBack}s ease`
            progressBar.style.width = '100%'
            setTimeout(() => {
                progressBar.style.transition = 'none'
            }, progressBarSnapBack*1000)
        }

        errorDiv.addEventListener('mouseenter', stopCountdown);
        errorDiv.addEventListener('mouseleave', startCountdown);
        
        startCountdown()
    }
   
    errorContainer.appendChild(errorDiv);

    async function removeError() {
        errorDiv.style.height = '0rem';
        setTimeout(() => {
            errorDiv.remove();
        }, slideOutTime*1000)
    }
}