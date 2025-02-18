const characterData = {
    type: 'file',
    fileType: 'character',
    modules: [
        { type: "name",          value: ["Name"],   position: { x: 10, y: 77 },   size: { width: "104px", height: "40px" }, scripts: ['../scripts/text.js']  },
        { type: "backstory",     value: ["{\"ops\":[{\"insert\":\"Backstory\\n\"}]}"],       position: { x: 524, y: 77 },  size: { width: "400px", height: "140px" }, scripts: ['../scripts/richEditorText.js']  },
        { type: "appearance",    value: ["{\"ops\":[{\"insert\":\"Appearance\\n\"}]}"],      position: { x: 10, y: 400 },  size: { width: "380px", height: "151px" }, scripts: ['../scripts/richEditorText.js']  },
        { type: "personality",   value: ["{\"ops\":[{\"insert\":\"Personality\\n\"}]}"],     position: { x: 524, y: 267 }, size: { width: "400px", height: "196px" }, scripts: ['../scripts/richEditorText.js']  },
        { type: "motivation",    value: ["{\"ops\":[{\"insert\":\"Motivation\\n\"}]}"],      position: { x: 524, y: 522 }, size: { width: "400px", height: "120px" }, scripts: ['../scripts/richEditorText.js']  },
        { type: "relationships", value: [[]],   position: { x: 10, y: 171 },  size: { width: "380px", height: "175px" },  scripts: ['../scripts/characterRelations.js'], },
        { type: "skills",        value: ["{\"ops\":[{\"insert\":\"Skills\\n\"}]}"],          position: { x: 10, y: 600 },  size: { width: "380px", height: "66px" }, scripts: ['../scripts/richEditorText.js'] },
        { type: "species",       value: ["Species"],           position: { x: 296, y: 76 },  size: { width: "94px",  height: "40px" }, scripts: ['../scripts/text.js']  },
        { type: "age",           value: ["Age"],             position: { x: 181, y: 77 },  size: { width: "48px",  height: "40px" }, scripts: ['../scripts/text.js']  },
    ],
   
    changes: ['Beginning'],
    changeIndex: 0
};

export default characterData;