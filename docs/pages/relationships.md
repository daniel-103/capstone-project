### Relationship Format

The relationships are a type of object in the databse, used to describe and keep track of whatever
relationships the user want in their story. They are stored in the database with the following format:


```javascript
const relationshipData = {
    type: 'file',
    fileType: 'relationship',
    modules: [
        { type: "name",      value: ['New Relationship'],  position: { x:  31, y:  62 }, size: { width: "200px", height: "40px" }, scripts: ['../scripts/text.js']   },
        { type: "entities",  value: [[]], position: { x: 465, y: 432 }, size: { width: "465px", height: "220px" }, scripts: ['../scripts/relationshipEntities.js']   },
        { type: "history",   value: ["{\"ops\":[{\"insert\":\"History\\n\"}]}"],           position: { x: 465, y:  62 }, size: { width: "465px", height: "260px" }, scripts: ['../scripts/richEditorText.js']   },
        { type: "dynamics",  value: ["{\"ops\":[{\"insert\":\"Dynamics\\n\"}]}"],          position: { x:  31, y: 167 }, size: { width: "325px", height: "125px" }, scripts: ['../scripts/richEditorText.js']   },
        { type: "conflict",  value: ["{\"ops\":[{\"insert\":\"Conflict\\n\"}]}"],          position: { x:  31, y: 550 }, size: { width: "325px", height: "125px" }, scripts: ['../scripts/richEditorText.js']   },
        { type: "potential", value: ["{\"ops\":[{\"insert\":\"Potential\\n\"}]}"],         position: { x:  31, y: 350 }, size: { width: "325px", height: "145px" }, scripts: ['../scripts/richEditorText.js']   },
    ],
    changes: ['Beginning'],
    changeIndex: 0
};
```

The modules hold all of the editable attributes of a relationship, and these attributes can also be
used for search queries in other parts of the application.

### Relationship Creation/Deletion

To create or delete a relationship, you can go to the relationships page. There you will find an "X" button 
next to each relationship, and pressing it immediatly removes the relationship foro the database. To add a
relationship, click the add relationship button, which uses the post operation to add a relationship to the 
database.

In order to add new relationships in other parts of the application, be sure to allign the creation
with the above relationship format.

