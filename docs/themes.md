Themes are primarily a color palette used to change the apperance of elements. They will also have the ability to change other visual aspects of the application in the future.

Themes are a collection of css `:root` variables. Each theme is contained to its own css file. Here is dark.css for example:
> `dark.css`
> ```css
> :root {
>     --background-color: #202020;
> 
>     --header-section-color: #303030;
>     --header-button-color: transparent;
>     --header-text-color: white;
> 
>     --left-panel-section-color: #303030;
>     --left-panel-option-buttons-color: white;
> 
>     --hierarchy-folder-text-color: white;
>     --hierarchy-folder-icon-color: white;
>     --hierarchy-file-text-color: white;
> 
>     --tab-section-color: #303030;
>     --tab-button-color: #505050;
>     --tab-text-color: white;
> 
>     --page-background-color: lightslategray;
>     --page-background-border-color: slategray;
>     --page-snap-line-color: white;
>     --page-grid-color: white;
>     --page-text-color: black;
>     --page-module-selected-color: #0078d7;
>
>     ...
> }
> ```

Themes are stored in `src/assets/themes/`.

Switching themes is done by switching the html's stylesheet href. Notice, however, that there are no stylesheet links to themes in any html. This is because the theme is injected into the html and each imported html recursively. This is done in `themeManager.js`. Because imported documents do not share the same `:root` css variables with the parent document or other sibling documents, the theme must be injected into each document's html in order for the theme's css variables to be visible to that document's css. 

To create your own theme, simply duplicate a preexisting theme's css file and change the colors in the new file to your liking.

There is no current way to change themes from the UI. To manually change the theme, go to `src/preload.js` and change the file name where `theme` is being set in `localStorage` on `line 9`.