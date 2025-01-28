// await window.top.db.createIndex({
//     index: { fields: ['type'] }
// });

window.db.put({  _id: 'character_1', type: 'character', name: 'bob'});
window.db.put({  _id: 'character_2', type: 'character', name: 'bob2'});
window.db.put({  _id: 'event1', type: 'event', name: 'eee'});