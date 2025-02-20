## Overview
This is a list of all the script types we currently have and describes what they do.

## Basic Text
This is the most basic script, the default for a module is there is no dedicated type yet. all it does is create a basic editable div and puts it into the module.

```javascript
path = '../scripts/text.js';
```

## Rich Text
This script is for modules that are meant for writing a lot of text. It applies a quill text editor to the module, allowing for complete rich text editor control and header options you would have in a quill document.

```javascript
path = '../scripts/richEditorText.js';
```

## Character's Relationships
This script lists all of the rlationships of a character, allowing you to choose and click on a relationship, which will take you to the relationship's page. You can also delete a relationship from this list, which will remove the character from that relationship.

This script should only be used on modules of a character. This will soon be explanded to allowing objects of any entity.

```javascript
path = '../scripts/characterRelations.js';
```

## Relationship's Entities
This script lists all of the entities associated with this relationship. You can click on any of these entities to take you that entitie's page, ore delete an entity, which will remove that entity from this relationship. You can alos add new entities, which allows you to choose from any already existing entity that is not currently in this relationship and add that entity to this relationship.

This script should only be used on a relationship object.

```javascript
path = '../scripts/relationshipEntities.js';
```
