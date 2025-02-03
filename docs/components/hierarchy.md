# Hierarchy

The file hierarchy is the tool that lets the user navigate through the files and folders of their project. It shows a tree list of the files and folders which are clickable and colapsable.

## Options
### New file
Create a new file under the selected folder from a selection of different file types.

### New folder
Create a new folder under the selected folder.

### View Root as Root
View the root of the project as the viewed root. Used primarily to return to the default scope.

### View Current as Root
View the currently selected folder as the root. This does not make the selected folder the actual root of the project, but instead view the project in a narrower scope as if the selected folder were the root of the project. This is useful for when the user has a very large tree and wishes to view only a small portion of the tree. 

For instance, if the user has the following tree in their hierarchy:
```
Root
    Characters
        Corin Cadence
        Saphira Bjartskular
        Wei Shi Lindon
        Hugh of Emblin
        The Lavender Fox
    Locations
        Du Weldenvarden
        Aran'alia
        Jade Mountain
    Factions
        Abidan
        Varden
        Visages
```
They can select a folder such as "Locations" and be presented with the resulting hierarchy:
```
Locations
    Du Weldenvarden
    Aran'alia
    Jade Mountain
```
By pressing the "View Root as Root" button, the user will be taken back to the original hierarchy.

(btw, all of these are easter eggs. Can you find all of them?)