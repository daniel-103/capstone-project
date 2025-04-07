const projectId = localStorage.getItem('projectId');
const nodeGraphData = {
    parentId: projectId,
    type: 'file',
    fileType: 'nodeGraph',
    modules: [
        { type: "node", value: ['Relationship Map'],position: {x: '50%', y: '50%' }, scripts: ['../scripts/nodes.js'] },
    ],
    changes: ['Beginning'],
    changeIndex: 0
       
};

export default nodeGraphData;