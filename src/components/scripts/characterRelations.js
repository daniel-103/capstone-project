async function initCharacterRelationsModule() {
    const urlParams = new URLSearchParams(window.location.search);
    entityId = urlParams.get("id");
    try {
        entityData = await window.top.db.get(entityId);
        
        console.log(entityData);
    } catch (err) {
        console.error("Failed to fetch document:", err);
    }
}

initCharacterRelationsModule();