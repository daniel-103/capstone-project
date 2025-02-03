# Program Object

The program object is the top-most object in the program. Rather than looking for all objects whose `parentId` = `null` to get all of the project roots, this object simply contains an array of all of the project ids for quick access. The program object is used when displaying all projects in the project hub. The id of the opened project is passed on from there.

Below is an example of how the program object is structured:

```js
{
    _id: "Skryptor",
    projects: [
        "231b5b4b-17f3-418d-b836-2aea53ccf12c",
        "59730277-81bb-4cfb-b24f-f9a8f6bd19b6"
    ]
}
```

> `_id`:  
> \<String>  
> The id of the program object. Because there is only one program object, its id will always be `"Skryptor"`.

> `projects`:  
> \<Array\<String>>  
> An array of all project ids.