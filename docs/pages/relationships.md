### Relationship Format

The relationships are a type of object in the databse, used to describe and keep track of whatever
relationships the user want in their story. They are stoed in the database with the following format:


{
    type: 'folder',
    fileType: 'relationship',
    modules: {
        name:            { value: ['New Relationship'],  position: { x:  31, y:  62 }, size: { width: "200px", height: "40px" } },
        entities:        { value: ['Entities Involved'], position: { x: 465, y: 432 }, size: { width: "465px", height: "220px" } },
        history:         { value: ['History'],           position: { x: 465, y:  62 }, size: { width: "465px", height: "260px" } },
        dynamics:        { value: ['Dynamics'],          position: { x:  31, y: 167 }, size: { width: "325px", height: "125px" } },
        conflict:        { value: ['Conflict'],          position: { x:  31, y: 550 }, size: { width: "325px", height: "125px" } },
        potential:       { value: ['Potential'],         position: { x:  31, y: 350 }, size: { width: "325px", height: "145px" } },
    },
    changes: ['Beginning'],
    changeIndex: 0
}


The modules hold all of the editable attributes of a relationship, and these attributes can also be
used for search queries in other parts of the application.

### Relationship Creation/Deletion

To create or delete a relationship, you can go to the relationships page. There you will find an "X" button 
next to each relationship, and pressing it immediatly removes the relationship foro the database. To add a
relationship, click the add relationship button, which uses the post operation to add a relationship to the 
database.

In order to add new relationships in other parts of the application, be sure to allign the creation
with the above relationship format.

