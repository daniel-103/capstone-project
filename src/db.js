window.top.db.createIndex({
    index: { fields: ['type'] }
});

window.db.post({
    type: 'character',
    modules: {
        name:        { value: 'bob', position: {x: 0, y: 0} },
        description: { value: 'Description',   position: {x: 0, y: 0} },
        backstory:   { value: 'Backstory',     position: {x: 0, y: 0} }
    }
});

window.db.post({
    type: 'character',
    modules: {
        name:        { value: 'bob2', position: {x: 0, y: 0} },
        description: { value: 'Description',   position: {x: 0, y: 0} },
        backstory:   { value: 'Backstory',     position: {x: 0, y: 0} }
    }
});