
const folders = document.querySelectorAll('.folder-name');

folders.forEach(folder => {
    folder.addEventListener('click', function() {
    const folderItem = this.parentElement;
    folderItem.classList.toggle('open');
    });
});
