export function addSelect() {
    document.removeEventListener('click', handleSelect);
    document.addEventListener('click', handleSelect);  
}

function handleSelect(event) {

    document.querySelectorAll('.module').forEach(m => {
        m.dataset.selected = "false";
    });

    if (event.target.closest(".module") && event.target.closest(".module").classList.contains("selected")) {
        let module = null;
        if (event.target.classList.contains("module")) {
            module = event.target;
        }
     
        if (!module) return;

        module.dataset.selected = "true";
    } else {
        console.log("no region")
    }
}

