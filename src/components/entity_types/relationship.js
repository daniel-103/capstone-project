const relationshipData = {
    type: 'folder',
    fileType: 'relationship',
    modules: [
        { type: "name",      value: ['New Relationship'],  position: { x:  31, y:  62 }, size: { width: "200px", height: "40px" }, scripts: ['../scripts/text.js']   },
        { type: "entities",  value: ['Entities Involved'], position: { x: 465, y: 432 }, size: { width: "465px", height: "220px" }, scripts: ['../scripts/text.js']   },
        { type: "history",   value: ['History'],           position: { x: 465, y:  62 }, size: { width: "465px", height: "260px" }, scripts: ['../scripts/text.js']   },
        { type: "dynamics",  value: ['Dynamics'],          position: { x:  31, y: 167 }, size: { width: "325px", height: "125px" }, scripts: ['../scripts/text.js']   },
        { type: "conflict",  value: ['Conflict'],          position: { x:  31, y: 550 }, size: { width: "325px", height: "125px" }, scripts: ['../scripts/text.js']   },
        { type: "potential", value: ['Potential'],         position: { x:  31, y: 350 }, size: { width: "325px", height: "145px" }, scripts: ['../scripts/text.js']   },
    ],
    changes: ['Beginning'],
    changeIndex: 0
};

export default relationshipData;