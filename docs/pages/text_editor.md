# Text Editor Documentation

The text editor is built upon the CKEditor 5 framework, starting with the CKEditor Builder
Link to CKEditor 5 Documentation: https://ckeditor.com/docs/ckeditor5/latest/index.html
Free License key allows 1000 load/month, which should be enough

The toolbar can be edited in text_editor.js

`text_editor.js`
``` js
toolbar: {
		items: [
			...
		],
		shouldNotGroupWhenFull: false
	}, 
```

where ... represents each component of the text editor tool bar

Most functionality of the rich-text features comes from CKEditor's plugins, which are located below the toolbar items

`text_editor.js`
``` js
plugins: [
    ...
]
```

where ... represents all of the plugins that the project is using.
Note that all plugins used are under the free license for CKEditor 5, other functionalities that require premium access
and are a planned addition will be implemented ourselves

The style sheet for the customization of the text editor's appereance can be found in text_editor.css