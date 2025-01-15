## OUTDATED! This method is no longer used. We are using iframes instead but the concept is similar.

The index.html is comprised of multiple html documents. This is done to compartmentalize work between developers and for organization. Instead of cluttering a single document with countless features from multiple people, code is healthily separated into self-contained objects that import their own js and css.

To do this, we create object elements within index.html like the following:

> `index.html`
> ```html
> <object type="text/html" data="path/to/your_html.html" class="import"></object>
> ```

where `path/to/your_html.html` is the location of the imported html. 

For example, to import the hierarchy in the left panel:

> `hierarchy.html`
> ```html
> ...
>     <div id="window">
>         <div id="leftPanel">
>             <object type="text/html" data="components/hierarchy/hierarchy.html" class="import"></object>
>         </div>
>         <div id="panelResizer"></div>
>         <div id="rightPanel">
>             ...
> ```

Inside of the file of the imported html, the necesary css and js can then be added as usual. Continuing the hierarchy example:

> `hierarchy.html`  
> ```html
> ...
> <link rel="stylesheet" href="hierarchy.css">
> <script src="hierarchy.js"></script>
> ```

Compartmentalization doesnt have to be constrained to only index.html. Imported html objects can import other html objects of their own.