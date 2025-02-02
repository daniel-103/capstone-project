### Relationship Format

The relationships are a type of object in the databse, used to describe and keep track of whatever
relationships the user want in their story. They are stoed in the database with the following format:

```json 
{
    "_id": "id",
    "_rev": "rev",
    "type": "relationship",
    "modules": {
        "name":        { "value": "Name", "position": {"x": 0, "y": 0} },
        "description": { "value": "Description", "position": {"x": 0, "y": 0} },
        // and so on
    }
}
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

