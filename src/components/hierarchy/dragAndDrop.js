function setupDragAndDrop() {
    let draggedItem = null;
    let currentDropTarget = null;

    // Drag start handler
    document.addEventListener('dragstart', e => {
        if (!e.target.closest('.file')) return;
        draggedItem = e.target.closest('.file');
        
        e.dataTransfer.setData('text/plain', JSON.stringify({
            id: draggedItem.id,
            parentId: draggedItem.dataset.parentId,
            type: 'file'
        }));

        const dragImg = document.createElement('img');
        dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        document.body.appendChild(dragImg);
        e.dataTransfer.setDragImage(dragImg, 0, 0);
        
    });

    // Drag over handler
    document.addEventListener('dragover', e => {
        e.preventDefault();

        if (!(e.target.closest('.folder,.file'))) return;

        e.dataTransfer.dropEffect = 'move';
        const dropTarget = e.target.closest('.folder');

        if (!(dropTarget && dropTarget !== currentDropTarget)) return;

        currentDropTarget?.classList.remove('drop-target');
        currentDropTarget = dropTarget;

        if (draggedItem.dataset.parentId === dropTarget.id) return;

        currentDropTarget.classList.add('drop-target');
        
    });

    // Drag leave handler
    document.addEventListener('dragleave', e => {
        if (e.target.closest('.folder')) return;
        currentDropTarget?.classList.remove('drop-target');
        currentDropTarget = null;
    });

    // Drop handler
    document.addEventListener('drop', async e => {
        e.preventDefault();
        currentDropTarget?.classList.remove('drop-target');
        
        if (!draggedItem || !currentDropTarget || draggedItem.dataset.parentId == currentDropTarget.id) return;
        
        const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
        const newParentId = currentDropTarget.id;

        try {
        const [oldParent, newParent, dragEntity] = await Promise.all([
            window.top.db.get(dragData.parentId),
            window.top.db.get(newParentId),
            window.top.db.get(dragData.id)
        ]);
        
        // Update parents
        oldParent.childrenIds = oldParent.childrenIds.filter(id => id !== dragData.id);
        
        if (!newParent.childrenIds.includes(dragData.id)) {
            newParent.childrenIds.push(dragData.id);
        }

        dragEntity.parentId = newParentId;

        // Update database
        await Promise.all([
            window.top.db.put(oldParent),
            window.top.db.put(newParent),
            window.top.db.put(dragEntity)
        ]);

        // Update UI
        draggedItem.remove();
        draggedItem.dataset.parentId = newParentId;
        currentDropTarget.querySelector('.folder-items').appendChild(draggedItem);
        currentDropTarget.classList.add('open');

        } catch (error) {
            console.error('Drag-drop error:', error);
            window.top.notify('error', 'Failed to move item');
        }

        draggedItem = null;
        currentDropTarget = null;
    });
}

export default setupDragAndDrop;