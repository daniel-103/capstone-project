const relationshipData = {
    type: 'file',
    fileType: 'relationship',
    modules: [
        { type: "name",      value: ['New Relationship'],  position: { x:  31, y:  62 }, size: { width: "200px", height: "40px" }, scripts: ['../scripts/text.js']   },
        { type: "entities",  value: [[]], position: { x: 465, y: 432 }, size: { width: "465px", height: "220px" }, scripts: ['../scripts/relationshipEntities.js']   },
        { type: "history",   value: ["{\"ops\":[{\"insert\":\"History\\n\"}]}"],           position: { x: 465, y:  62 }, size: { width: "465px", height: "260px" }, scripts: ['../scripts/richEditorText.js']   },
        { type: "dynamics",  value: ["{\"ops\":[{\"insert\":\"Dynamics\\n\"}]}"],          position: { x:  31, y: 167 }, size: { width: "325px", height: "125px" }, scripts: ['../scripts/richEditorText.js']   },
        { type: "conflict",  value: ["{\"ops\":[{\"insert\":\"Conflict\\n\"}]}"],          position: { x:  31, y: 550 }, size: { width: "325px", height: "125px" }, scripts: ['../scripts/richEditorText.js']   },
        { type: "potential", value: ["{\"ops\":[{\"insert\":\"Potential\\n\"}]}"],         position: { x:  31, y: 350 }, size: { width: "325px", height: "145px" }, scripts: ['../scripts/richEditorText.js']   },
    ],
    changes: ['Beginning'],
    changeIndex: 0
};

export default relationshipData;