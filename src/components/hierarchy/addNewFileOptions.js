import addEntity from "../enity_add/addEntity.js";

async function addNewFileOptions(fileOptions, slideout) {

    fileOptions.forEach(fileOption => {
        const button = document.createElement('button');
        button.id = fileOption.id;
        button.title = fileOption.title;
        button.textContent = fileOption.name;
        button.addEventListener('click', async () => {

            // grab selected folder (_id will be in attribute)
            const parentId = document.getElementsByClassName('folder selected')[0].id
            await addEntity(fileOption.sourcePath, fileOption.data.default, parentId).catch(error => {
                if (window.top.DEBUG) console.log(`❌ [3] Couldn't create file:`, error);
                window.top.notify('error', "Couldn't create file.");
            });
        }); 

        slideout.appendChild(button);
    })
}

export default addNewFileOptions;