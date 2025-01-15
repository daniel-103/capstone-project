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

Themes are stored in `src/assets/themes/`.

Switching themes is done by switching the html's stylesheet href. Notice, however, that there are no stylesheet links to themes in any html. This is because the theme is injected into the html and each imported html recursively. This is done in `themeManager.js`. Because imported documents do not share the same `:root` css variables with the parent document or other sibling documents, the theme must be injected into each document's html in order for the theme's css variables to be visible to that document's css. 

To create your own theme, simply duplicate a preexisting theme's css file and change the colors in the new file to your liking. Look at `spaceDust.css` for a good example of establishing a palette and applying the palette through the use of even more variables.

You may also notice that you can include custom css outside of `:root`. If you want to change something for your theme that isn't supported in the variables, you can manually set it here.

There is no current way to change themes from the UI. To manually change the theme, go to `src/preload.js` and change the file name where `theme` is being set in `localStorage` on `line 21`. This will set it in the app's localStorage and will reference that theme from now on until it's changed.