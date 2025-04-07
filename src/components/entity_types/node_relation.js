const projectId = localStorage.getItem('projectId');
const nodeGraphData = {
    parentId: projectId,
    type: 'file',
    fileType: 'nodeGraph',
    modules: [
        { type: "nodeGraph", nodes: [],value: ['Relationship Map'],position: {x: '100', y: '0' }, scripts: ['../scripts/nodes.js'] },
        //{ type: "nodes", }
    ],
    changes: ['Beginning'],
    changeIndex: 0
       
};

export default nodeGraphData;