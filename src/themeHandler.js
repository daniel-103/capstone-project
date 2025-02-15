let appPath;
let themePath;

// Get absolute path to theme. Have to do this because the htmls in iframes have different locations. Cant use realtive paths. (this is where I started making comments. I'm sorry...)
async function setAppPath() {
    appPath = await window.electron.getAppPath();
}

// Because js is stupid
function waitForHead(doc) {
    // Pinky promise I'll give you head. WAIT I mean THE head, not head. Unless??
    return new Promise(resolve => {
        // See bro, here it is, I didn't lie
        if (doc.head) return resolve(doc.head);

        // There is no head, take off your clothes.
        const observer = new MutationObserver(() => {
            // The doc got undecapitated? Magic?
            if (doc.head) {
                // Idk, don't question it
                observer.disconnect();
                // Found the head. :)
                resolve(doc.head);
            }
        });

        // Trust me bro, I'll get you the head, just trust.
        observer.observe(doc, { childList: true, subtree: true });
    });
}

// 'call' 'call' 'call' 'call' 'call' get injected get injected get injected get injected
async function injectTheme(object) {
    // Get someone's doxx on twitter
    themePath = localStorage.getItem('theme');

    // What's up
    let doc;
    try {
        // It's like one of these, idk
        doc = object.contentDocument || object;
    } catch (error) {
        // I lied 😈😈😈
        console.warn(error);
        return;
    }

    // fuck outa here with yo no doc lookin ass
    if (!doc) return;

    // Head? 😳
    const head = await waitForHead(doc);

    // Create or update theme link
    const existingLink = head.querySelector('#theme-link');

    // No link?
    if (!existingLink) {
        // Then build it in a cave with a box of scraps!
        const linkObject = doc.createElement('link');
        linkObject.id = 'theme-link';
        linkObject.rel = 'stylesheet';
        linkObject.href = themePath;

        // LINK THAT SHIT
        head.appendChild(linkObject);
    } else {
        // Yes link, change it
        existingLink.href = themePath;
    }

    // Now do it again, recursively
    for (const nestedIframe of doc.querySelectorAll('iframe')) {
        // Sowwy, but the ifwame might not be woaded qwite yet...
        nestedIframe.addEventListener('load', async () => {
            // Now it is 😈
            await injectTheme(nestedIframe);
        });
    }
}

// It's chewsday?
async function init() {
    try {
        // Jarvis, Doxx my location 
        await setAppPath();

        // Get theme from local storage
        let themeFile = localStorage.getItem('theme');
        // No theme?
        if (!themeFile) {
            // Mewing is my default theme
            themeFile = `${appPath}/src/assets/themes/dark/dark.css`;
            // Send that sigma to the skibidi ohio office and have him edged!
            localStorage.setItem('theme', themeFile);
        }

        // Inject black tar heroin into the top doc
        await injectTheme(window.top.document);

    } catch (error) {
        // Uh oh
        console.log(`Couldn't set app path:`, error);
    }
}

// Bo'oh'o'wa'er
init();
