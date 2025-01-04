Themes are primarily a color palette used to change the apperance of elements. They will also have the ability to change other visual aspects of the application in the future.

Themes are a collection of css `:root` variables. Each theme is contained to its own css file. Here is light.css for example:
> `light.css`
> ```css
> :root {
>     --white0: #ffffff;
>     --white1: #efefef;
>     --white2: #dfdfdf;
>     --black0: #202020;
>     --black1: #404040;
>
>
>
>     --background-color: var(--white2);
>
>     --header-section-color: var(--white1);
>     --header-button-color: transparent;
>     --header-text-color: var(--black0);
>
>     --left-panel-options-section-color: var(--white1);
>     --left-panel-options-button-color: transparent;
>     --left-panel-options-icon-color: var(--black1);
>     --left-panel-options-button-hover-color: var(--black1);
>     --left-panel-options-icon-hover-color: var(--white1);
>
>     --hierarchy-folder-text-color: var(--black0);
>     --hierarchy-folder-icon-color: var(--black0);
>     --hierarchy-file-text-color: var(--black0);
>
>     --hierarchy-section-color: var(--white1);
>     --hierarchy-folder-color: transparent;
>     --hierarchy-folder-text-color: var(--black0);
>     --hierarchy-folder-icon-color: var(--black1);
>     --hierarchy-open-folder-color: var(--white0);
>     --hierarchy-open-folder-text-color: var(--black0);
>     --hierarchy-open-folder-icon-color: var(--black1);
>     --hierarchy-file-color: transparent;
>     --hierarchy-file-text-color: var(--black0);;
>     --hierarchy-selected-file-color: var(--black0);
>     --hierarchy-selected-file-text-color: var(--white0);
>
>     --tab-section-color: var(--white2);
>     --tab-button-color: var(--white1);
>     --tab-text-color: var(--black0);
>
>     --page-background-color: var(--white1);
>     --page-background-border-color: var(--white1);
>     --page-snap-line-color: var(--black0);
>     --page-grid-color: var(--black0);
>     --page-text-color: var(--black0);
>     --page-module-selected-color: #0078d7;
> }
> ```

Themes are stored in `src/assets/themes/`.

Switching themes is done by switching the html's stylesheet href. Notice, however, that there are no stylesheet links to themes in any html. This is because the theme is injected into the html and each imported html recursively. This is done in `themeManager.js`. Because imported documents do not share the same `:root` css variables with the parent document or other sibling documents, the theme must be injected into each document's html in order for the theme's css variables to be visible to that document's css. 

To create your own theme, simply duplicate a preexisting theme's css file and change the colors in the new file to your liking. Look at `spaceDust.css` for a good example of establishing a palette and applying the palette through the use of even more variables.

You may also notice that you can include custom css outside of `:root`. If you want to change something for your theme that isn't supported in the variables, you can manually set it here.

There is no current way to change themes from the UI. To manually change the theme, go to `src/preload.js` and change the file name where `theme` is being set in `localStorage` on `line 11`. This will set it in the app's localStorage and will reference that theme from now on until it's changed.