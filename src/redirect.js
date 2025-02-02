document.addEventListener('DOMContentLoaded', () => {
    const redirectButton = document.getElementById('redirectprojecthubButton');
    const windowIframe = document.getElementById('window');
  
    if (redirectButton && windowIframe) {
      redirectButton.addEventListener('click', () => {
        windowIframe.src = 'components/template/template.html';
      });
    }
  });