import {
    BaseEdge,
    EdgeLabelRenderer,
    getSmoothStepPath,
    useReactFlow,
  } from '@xyflow/react';
import {  PlusIcon, Trash2 } from 'lucide-react';
  
  export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY,source,target,markerEnd,style,fromPosition }) {
    const { setEdges,setNodes } = useReactFlow();
    const [edgePath, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      borderRadius:0
    });

    const handleAddNode = () => {
      console.log(id);
      
      setNodes((ns) => [...ns,{ id: `${source}${target}`,type:"customNode", position: { x: sourceX-100, y: Number((sourceY+targetY)/2)-25 }, data: { label: `${source}${target}`}}])
      setEdges((es) => [...es,{ id: `${source}->${source}${target}`, type: 'customEdge', source: source, target: `${source}${target}`,markerEnd: {"type": "arrowclosed",width: 10,height: 10,color: '#fa7ab3'},
        style: {strokeWidth: 2,stroke: '#fa7ab3',} },
                                        { id: `${source}${target}->${target}`, type: 'customEdge', source: `${source}${target}`, target: target,markerEnd: {"type": "arrowclosed",width: 10,height: 10,color: '#fa7ab3'},
                                        style: {strokeWidth: 2,stroke: '#fa7ab3',} }].filter(ed => ed.id != id));
    }

    const handleDeleteEdge = () => {
      setEdges((es) => es.filter(ed => ed.id != id));
    }
  
    return (
      <>
        <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
        <EdgeLabelRenderer>
          <div style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              padding:0,

              color:'black',
              // borderRadius:"50%",
              width:"60px",
              height:"15px",
              display:"flex",
              alignItems:"center",
              justifyContent:"space-between"
            }}
            className="nodrag nopan">
          <button
          className='bg-white rounded-full p-1'
            onClick={handleAddNode}
          >
            <PlusIcon className='w-4 h-4 text-green-600' />
          </button>
          <button onClick={handleDeleteEdge} className='bg-white p-1 rounded-full'>
            <Trash2 className='w-4 h-4 text-red-600' />
          </button>
          </div>
          

        </EdgeLabelRenderer>
      </>
    );
  }
  