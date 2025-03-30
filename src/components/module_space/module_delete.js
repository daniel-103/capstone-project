import { addSelect } from "./add_module_select.js";

export function moduleDelete(entityData) {
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Backspace') { return};

        const selected = document.querySelector('.module[data-selected="true"]');
        if (selected) {
            deleteModule(selected, entityData);
        }
    })
}

function deleteModule(module, entityData) {
    const moduleType = module.dataset.moduleKey;
    if (!module.classList.contains("selected")) return;
    
    entityData.modules = entityData.modules.filter(module => module.type !== moduleType);

    module.remove();
    addSelect();
}