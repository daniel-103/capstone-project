const projectId = localStorage.getItem('projectId');
const textDocumentData = {
    parentId: null,
    type: 'file',
    name: 'someDoc',
    fileType: 'textDocument',
    textData: "{\"ops\":[{\"insert\":\"543\\n\"}]}"
};

export default textDocumentData;