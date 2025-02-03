### Character Format

The characters are a type of object in the databse, used to describe and keep track of whatever
characters the user want in their story. They are stoed in the database with the following format:

{
    type: 'folder',
    fileType: 'character',
    modules: {
        name:          { value: ['New Character'],   position: { x: 10, y: 77 },   size: { width: "104px", height: "40px" } },
        backstory:     { value: ['Backstory'],       position: { x: 524, y: 77 },  size: { width: "400px", height: "140px" } },
        appearance:    { value: ['Appearance'],      position: { x: 10, y: 400 },  size: { width: "380px", height: "151px" } },
        personality:   { value: ['Personality'],     position: { x: 524, y: 267 }, size: { width: "400px", height: "196px" } },
        motivation:    { value: ['Motivation'],      position: { x: 524, y: 522 }, size: { width: "400px", height: "120px" } },
        relationships: { value: ['Relationships'],   position: { x: 10, y: 171 },  size: { width: "380px", height: "175px" } },
        skills:        { value: ['Skills'],          position: { x: 10, y: 600 },  size: { width: "380px", height: "66px" } },
        species:       { value: ['Human'],           position: { x: 296, y: 76 },  size: { width: "94px",  height: "40px" } },
        age:           { value: ['Age'],             position: { x: 181, y: 77 },  size: { width: "48px",  height: "40px" } },
    },
    changes: ['Beginning'],
    changeIndex: 0
}

The modules hold all of the editable attributes of a character, and these attributes can also be
used for search queries in other parts of the application.

### Character Creation/Deletion

To create or delete a character, you can go to the characters page. There you will find an "X" button 
next to each character, and pressing it immediatly removes the character foro the database. To add a
character, click the add character button, which uses the post operation to add a character to the 
database.

In order to add new characters in other parts of the application, be sure to allign the creation
with the above character format.

