async function getFileOptions(template) {
    const fileOptions = template.fileOptions;
    let fileOptionData = null;

    for (let i=0; i<fileOptions.length; i++) {
        fileOptionData = null;
        try {
            console.log(fileOptions[i].dataPath);
            fileOptionData = await import(fileOptions[i].dataPath);
        } catch (error) {
            console.error(error);
        }
        if (fileOptionData) {
            console.log('file otion data: ', fileOptionData);
            fileOptions[i].data = fileOptionData;
        }
       
    }

    return fileOptions;
}

export default getFileOptions;