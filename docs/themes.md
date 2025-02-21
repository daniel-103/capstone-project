# Themes

Themes are primarily a color palette used to change the apperance of elements. They also have the ability to change other visual aspects of the application.

Themes are a collection of css `:root` variables. Each theme is contained to its own css file. Here is a section dark.css for example:
> `dark.css`
> ```css
> :root {
>    --black0: #202020;
>    --black1: #303030;
>    --black2: #505050;
>    --white0: white;
>    --white1: #D0D0D0;
>
>
>
>    --background-color: var(--black0);
>
>    --header-section-color: var(--black1);
>
>    --header-logo-primary-color: var(--white0);
>    --header-logo-secondary-color: var(--white1);
>
>    --header-button-color: transparent;
>    --header-text-color: var(--white0);
>
>    --header-button-hover-color: var(--white0);
>    --header-hover-text-color: var(--black1);
>
>    --header-window-controls-color: transparent;
>    --header-window-controls-icon-color: var(--white0);
>    --header-window-controls-hover-color: var(--white0);
>    --header-window-controls-icon-hover-color: var(--black1);
>
>    ...
> }
> ```

Themes are stored in `src/assets/themes/`. By default, a collection of built-in themes are provided for you. These are found in the `dark` and `light` folders in the theme directory. To switch to a different theme, go to File/Settings and a settings window will appear. You can navigate all of the themes through a file hierarchy similar to the project file hierarchy. The refresh button refreshes the hierarchy in case you want to import or manage the theme files outside of the application.

Switching themes is done by switching the html's stylesheet href. Notice, however, that there are no stylesheet links to themes in any html. This is because the theme is injected into the html and each imported html recursively. This is done in `themeManager.js`. Because imported documents do not share the same `:root` css variables with the parent document or other sibling documents, the theme must be injected into each document's html in order for the theme's css variables to be visible to that document's css. 

To create your own theme, simply duplicate a preexisting theme's css file and change the colors in the new file to your liking. Look at `spaceDust.css` for a good example of establishing a palette and applying the palette through the use of even more variables.

You may also notice that you can include custom css outside of `:root`. If you want to change something for your theme that isn't supported in the variables, you can manually set it here.

