# Folder Object

The folder object contains other folder objects and file objects. 

Below is an example of a folder object within the database:

```js
{
    _id: "c91a5499-26b4-400d-8dfb-2dd44c606aad",
    name: "New Folder",
    type: "folder",
    parentId: "231b5b4b-17f3-418d-b836-2aea53ccf12c",
    childrenIds: [
        "d6150676-e85d-433e-b293-b07c7141bed9",
        "c6856c17-2b9c-4c0d-9f1a-e64519075d2e"
    ],
    date: {
        created: new Date(),
        last: new Date()
    }
}
```

> `_id`:  
> \<String>  
> The id of the folder. This is automatically generated when the folder is created using `db.post()`. "c91a5499-26b4-400d-8dfb-2dd44c606aad" is an acurate example of what an id generated with `db.post()` will look like.

> `name`:  
> \<String>  
> The name of the folder.

> `type`:  
> \<String>  
> A folder's type is represented by the string `folder`.

> `parentId`:  
> \<String>  
> The parent id of this folder.

> `childrenIds`:  
> \<Array\<String>>  
> An array of the ids of the folder's children. 

>`date`:  
> \<object>  
> 
>> `created`:  
>> \<Date>  
>> A date showing when the project was created
>
>> `updated`:  
>> \<Date>  
>> A date showing when the project was last updated