# Project Object

Projects are similar to folders in the sense that they have children, but they lack a parent id. Project objects are essentially just the roots of file structures. They also contain fields such as `image` and `description` that are not present in standard folders. These extra fields are necessary because they are needed in the project hub where the user can see all of their projects. This data helps visually distinguish between projects.

Below is an example of a project object within the database:

```js
{
    _id: "231b5b4b-17f3-418d-b836-2aea53ccf12c",
    name: "NewWorldMain",
    type: "folder",
    parentId: null,
    image: "dog.jpg",
    description: "This is a test project",
    childrenIds: [
        "c91a5499-26b4-400d-8dfb-2dd44c606aad",
        "ad55c8e3-caab-410c-9e58-f93cecc6a85a"
    ],
    date: {
        created: new Date(),
        last: new Date()
    }
}
```

> `_id`:  
> \<String>  
> The id of the project. This is automatically generated when the project is created using `db.post()`. "231b5b4b-17f3-418d-b836-2aea53ccf12c" is an acurate example of what an id generated with `db.post()` will look like.

> `name`:  
> \<String>  
> The name of the project. This is what is shown in the project hub and as the name of the root folder of the project. 

> `type`:  
> \<String>  
> The project root is considered a `folder`.

> `parentId`:  
> \<String>  
> The root folder of the project has no parent id, thus it is `null`.

> `image`:  
> \<String>  
> This is the image that is displayed on the project hub. All images are stored in `src/assets/images/`, so this path is not present and only the name and extension of the image file is needed.

> `description`:  
> \<String>  
> The description of the project which is only shown in the project hub.

> `childrenIds`:  
> \<Array\<String>>  
> An array of the ids of the root folder's children. 

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