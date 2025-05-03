const projectId = localStorage.getItem('projectId');
const nodeGraphData = {
    parentId: null,
    type: 'file',
    fileType: 'nodeGraph',
    name: 'Graph',
    modules: [
        { type: "nodeGraph",value: ['Relationship Map'],position: {x: '500', y: '0' }, scripts: ['../scripts/nodeGraphScript.js'] },

        
    ],
    changes: ['Beginning'],
    changeIndex: 0
    
       
};

export default nodeGraphData;