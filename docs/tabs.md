The main way users can manipulate and view information is in the form of pages, which are viewed
through tabs. Each tab contains a page, and a user can open tabs throug hvarious navigation
forms, including the "+" button at the right of all the tabs, and can delete a tab and close
the page by pressing the "X" button in the tab.

The tabs work by containing a list of iframes representing each page. They are completely 
modularized, and all thats needed to add a new tab is the path of the html file of the
new page. 

These file paths can be added to the default_page.js file, where adding another path to
the list will allow to user to see the page in the default_page (the page that opens when
pressing the "+" button), allowing the user to switch the page the tab is containing to
any available page: 

const pagePaths = [ 
    { title: "Snapping Grid", path: "../page/page.html"},
    { title: "Timeline", path: "../timeline/timeline.html"},
    { title: "Text Editor", path: "../text_editor/text_editor.html"}
];
