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
        Katashi's Arbiter
        Azdinist
        Bjartskular
        Orthos
        Stormward
        The Lavender Fox
    Locations
        Du Weldenvarden
        Aran'alia
        Jade Mountain
        Valley of Gods' Blood and Earth Flame
    Factions
        Abidan
        Varden
        Visages
    Events
        The Scorching
        The Second Calamity
```
They can select a folder such as "Locations" and be presented with the resulting hierarchy:
```
Locations
    Du Weldenvarden
    Aran'alia
    Jade Mountain
    Valley of Gods' Blood and Earth Flame
```
By pressing the "View Root as Root" button, the user will be taken back to the original hierarchy.

(btw, all of these are easter eggs, well not really easter eggs since they aren't really hidden, but more like references to other stories that I had the pleasure of reading. 
Some are dead easy, some are nearly imposible. I provided a little chart for reference. Can you find all of them?
Feel free to message me if you think you know where these are from or are just interested.)

1. Bjartskular *(free, literally the front page of google)*
2. Du Weldenvarden
3. Stormward *(easy, might need to scroll a bit for these)*
4. Orthos
5. Katashi's Arbiter *(medium, needs a bit of digging)*
6. The Lavender Fox  
*Hint: "I was a gath'rer of absolute truths. Now I ruminate on the absurd."* 
7. Jade Mountain *(hard, good luck)*  
*Hint: Watch out for burning cacti.*
8. The Second Calamity  
*Hint: Don't insult his cooking.*
9. Aran'alia  
*Hint: "It says, My Name Is* [redacted]*. You Were Always My Friend."*  
*I actually did the math on this; You have a 0.0005% chance that you know this.*
10. Valley of Gods' Blood and Earth Flame *(nearly impossible, you're insane)*  
*Hint: "When we were young..."*  
*And you have a 0.0001% chance you know this one. How'd I get this data? ¯\\\_(ツ)_/¯ It is real data though!*

## Right Click Options
By right clicking on a file or folder you will see rename and delte options. These are used to rename and delete files and folders. Folders can only be deleted if they do not have any children. Renaming and deleting with change the open tabs accordingly, changing their name or closing them if the associated file is deleted. The root folder cannot be deleted as it is more the entire project rather than a basic folder.

## Dragging and Dropping
By clicking and dragging a file in the hierarchy, users are able to move them to different locations within the same projct.