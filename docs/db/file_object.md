# File Object

A file object is the object that contains the information that makes up a page. The structure of every page is the same. The different types of pages are achieved through the use of modules. The collections of modules is what differentiates the different types of pages. A module is a self-contained element that has its own styling, js scripts, and properties. Creating pages in this way allows us to handle pages in a modular fashion.

Below is an example of a file object within the database:

```js
{
    _id: "d6150676-e85d-433e-b293-b07c7141bed9",
    parentId: "c91a5499-26b4-400d-8dfb-2dd44c606aad",
    type: "file",
    fileType: "character",
    name: "Bobathy",
    date: {
        created: new Date(),
        last: new Date(),
    },
    modules: [
        {
            type: "title",
            name: "Bob (Short for Bobathy)",
            position: {
                x: 0,
                y: 0
            }
        },
        {
            type: "textBox",
            content: "Bob is just a really cool guy.",
            position: {
                x: 8,
                y: 16
            }
        },
        {
            type: "textBox",
            content: "In 1989, Bob has incurred 19.5 million dollars in debt to the IRS over multiple counts of tax fraud.",
            position: {
                x: 8,
                y: 64
            }
        }
    ]
}
```

Note: This is what we should be doing. Right now, we have modules as an object with each type of module being the object's fields. We should transition to using this structure instead.

> `_id`:  
> \<String>  
> The id of the file. This is automatically generated when the project is created using `db.post()`. "c91a5499-26b4-400d-8dfb-2dd44c606aad" is an acurate example of what an id generated with `db.post()` will look like.

> `parentId`:  
> \<String>  
> The id of this file's parent folder.

> `type`:  
> \<String>  
> A files's type is represented by the string `file`.

> `fileType`:  
> \<String>  
> A string representing the collection of modules in the file. Though, this is not a concrete description of the file since the file's modules can change after creation. It is just a suggestion on what the file should be.

> `name`:  
> \<String>  
> The name of the file.

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

> `modules`:  
> \<Array\<object>>  
> 
>> `type`:  
>> \<String>  
>> The type of the module. This will determine the class of the created element for styling and the set of scripts to import required by the module.
>
>> `content`:  
>> \<T>  
>> The content of the file. This can be of any type since it will be handled by the module's script.
>
>> `position`:  
>> \<object>  
>>
>>> `x`:  
>>> \<int>  
>>> Horizontal position of the module from the left of the window.
>>
>>> `y`:  
>>> \<int>  
>>> Vertical position of the module from the top of the window.

