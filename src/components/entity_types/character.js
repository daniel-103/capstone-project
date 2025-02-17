const characterData = {
    type: 'folder',
    fileType: 'character',
    modules: [
        { type: "name",          value: ['New Character'],   position: { x: 10, y: 77 },   size: { width: "104px", height: "40px" }, scripts: ['../scripts/text.js']  },
        { type: "backstory",     value: ['Backstory'],       position: { x: 524, y: 77 },  size: { width: "400px", height: "140px" }, scripts: ['../scripts/text.js']  },
        { type: "appearance",    value: ['Appearance'],      position: { x: 10, y: 400 },  size: { width: "380px", height: "151px" }, scripts: ['../scripts/text.js']  },
        { type: "personality",   value: ['Personality'],     position: { x: 524, y: 267 }, size: { width: "400px", height: "196px" }, scripts: ['../scripts/text.js']  },
        { type: "motivation",    value: ['Motivation'],      position: { x: 524, y: 522 }, size: { width: "400px", height: "120px" }, scripts: ['../scripts/text.js']  },
        { type: "relationships", value: ['Relationships'],   position: { x: 10, y: 171 },  size: { width: "380px", height: "175px" },  scripts: ['../scripts/text.js'], },
        { type: "skills",        value: ['Skills'],          position: { x: 10, y: 600 },  size: { width: "380px", height: "66px" }, scripts: ['../scripts/text.js'] },
        { type: "species",       value: ['Human'],           position: { x: 296, y: 76 },  size: { width: "94px",  height: "40px" }, scripts: ['../scripts/text.js']  },
        { type: "age",           value: ['Age'],             position: { x: 181, y: 77 },  size: { width: "48px",  height: "40px" }, scripts: ['../scripts/text.js']  },
    ],
   
    changes: ['Beginning'],
    changeIndex: 0
};

export default characterData;