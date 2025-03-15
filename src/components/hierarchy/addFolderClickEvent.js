// Folder selection (last clicked)
function addFolderClickEvent(folder) {
    folder.querySelector('.folder-name').addEventListener('click', () => {
        folder.classList.toggle('open');
        document.querySelectorAll('.selected').forEach(selected => {
            selected.classList.remove('selected');
        });
        folder.classList.add('selected');
    });
}

export default addFolderClickEvent;