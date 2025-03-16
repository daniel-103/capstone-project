async function saveTextDocument(textDataObject, textData) {
    try {
        textDataObject.textData = textData;
        const result = await window.top.db.put(textDataObject);
        textDataObject._rev = result.rev;
    } catch (err) {
        console.error("Error saving document:", err);
    }
}

export default saveTextDocument;