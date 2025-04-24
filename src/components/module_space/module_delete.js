import { addSelect } from "./add_module_select.js";

export function moduleDelete(entityData) {
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Backspace') return;        

        const selected = document.querySelector('.module[data-selected="true"]');

        if (["entities", "relationships"].includes(selected.dataset.moduleKey)) return;


        if (selected) {
            deleteModule(selected, entityData);
        }
    })
}

async function deleteModule(module, entityData) {
    const moduleType = module.dataset.moduleKey;
    if (!module.classList.contains("selected")) return;
    
    if (!(await confirmDelete())) return;

    entityData.modules = entityData.modules.filter(module => module.type !== moduleType);

    module.remove();
    addSelect();
}

function confirmDelete() {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, sans-serif;
      `;
      
      modal.innerHTML = `
        <div style="
          background: #2d2d2d;
          padding: 25px;
          border-radius: 12px;
          max-width: 320px;
          width: 90%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          text-align: center;
          color: white;
        ">
          <h3 style="margin: 0 0 15px 0; font-weight: 500; font-size: 1.2em;">
            Confirm Deletion
          </h3>
          <p style="margin: 0 0 20px 0; color: #e0e0e0; line-height: 1.4;">
            Are you sure you want to delete this item?
          </p>
          <p style="margin: 0 0 25px 0; font-size: 0.85em; color: #aaa;">
            This action cannot be undone.
          </p>
          <div style="display: flex; justify-content: center; gap: 12px;">
            <button id="cancelBtn" style="
              padding: 8px 20px;
              border: none;
              border-radius: 20px;
              background: #404040;
              color: white;
              cursor: pointer;
              font-size: 0.9em;
              transition: all 0.2s;
            ">
              Cancel
            </button>
            <button id="confirmBtn" style="
              padding: 8px 20px;
              border: none;
              border-radius: 20px;
              background: #ff4d4d;
              color: white;
              cursor: pointer;
              font-size: 0.9em;
              transition: all 0.2s;
            ">
              Delete
            </button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Button hover effects
      const cancelBtn = modal.querySelector('#cancelBtn');
      const confirmBtn = modal.querySelector('#confirmBtn');
      
      cancelBtn.onmouseenter = () => cancelBtn.style.background = '#505050';
      cancelBtn.onmouseleave = () => cancelBtn.style.background = '#404040';
      confirmBtn.onmouseenter = () => confirmBtn.style.background = '#ff6666';
      confirmBtn.onmouseleave = () => confirmBtn.style.background = '#ff4d4d';
      
      // Button actions
      cancelBtn.onclick = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.remove();
          resolve(false);
        }, 200);
      };
      
      confirmBtn.onclick = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
          modal.remove();
          resolve(true);
        }, 200);
      };
      
      // Fade-in animation
      setTimeout(() => {
        modal.style.transition = 'opacity 0.2s';
        }, 10);
    });
  }
  