### Character Format

The characters are a type of object in the databse, used to describe and keep track of whatever
characters the user want in their story. They are stoed in the database with the following format:

```json 
{
    "_id": "id",
    "_rev": "rev",
    "type": "character",
    "modules": {
        "name":        { "value": "Name", "position": {"x": 0, "y": 0} },
        "description": { "value": "Description", "position": {"x": 0, "y": 0} },
        // and so on
    }
}
```

The modules hold all of the editable attributes of a character, and these attributes can also be
used for search queries in other parts of the application.

### Character Creation/Deletion

To create or delete a character, you can go to the characters page. There you will find an "X" button 
next to each character, and pressing it immediatly removes the character foro the database. To add a
character, click the add character button, which uses the post operation to add a character to the 
database.

In order to add new characters in other parts of the application, be sure to allign the creation
with the above character format.

