const leftPanel = document.getElementById('leftPanel');
    const rightPanel = document.getElementById('rightPanel');
    const resizer = document.getElementById('panelResizer');
    let isResizing = false;

    resizer.addEventListener('mousedown', (event) => {
        document.querySelector('iframe').style.pointerEvents = 'none';

        isResizing = true;
        document.body.style.cursor = 'ew-resize';
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
    });

    function handleMouseMove(event) {
        if (!isResizing) return;

        // const windowWidth = document.getElementById('window').offsetWidth;
        const windowWidth = document.body;
        let newLeftPanelWidth = event.clientX;

        // Minimum and maximum widths for the left panel
        const minWidth = 100;
        const maxWidth = windowWidth * 0.75;

        if (newLeftPanelWidth < minWidth) {
            newLeftPanelWidth = minWidth;
        } else if (newLeftPanelWidth > maxWidth) {
            newLeftPanelWidth = maxWidth;
        }

        // Apply new width to the left panel
        leftPanel.style.width = `${newLeftPanelWidth}px`;
        rightPanel.style.width = `calc(100% - ${newLeftPanelWidth}px)`;
    }

    function stopResize() {
        document.querySelector('iframe').style.pointerEvents = 'auto';
        
        isResizing = false;
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopResize);
    }