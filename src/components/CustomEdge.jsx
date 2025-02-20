import {
    BaseEdge,
    EdgeLabelRenderer,
    getSmoothStepPath,
    useReactFlow,
  } from '@xyflow/react';
import {  PlusIcon } from 'lucide-react';
  
  export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY,source,target }) {
    const { setEdges,setNodes } = useReactFlow();
    const [edgePath, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
      borderRadius: 20
    });

    const handleAddNode = () => {
      setNodes((ns) => [...ns,{ id: `${source}${target}`,type:"customNode", position: { x: sourceX, y: Number((sourceY+targetY)/2) }, data: { label: `${source}${target}` } }])
      setEdges((es) => [...es,{ id: `${source}->${source}${target}`, type: 'customEdge', source: source, target: `${source}${target}` },
                                        { id: `${source}${target}->${target}`, type: 'customEdge', source: `${source}${target}`, target: target }].filter(ed => ed.id != id));
    }
  
    return (
      <>
        <BaseEdge id={id} path={edgePath}/>
        <EdgeLabelRenderer>
          <button
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              padding:0,
              backgroundColor:'white',
              color:'black',
              borderRadius:"50%",
              width:"10px",
              height:"10px",
              display:"flex",
              alignItems:"center",
              justifyContent:"center"
            }}
            className="nodrag nopan"
            onClick={handleAddNode}
          >
            <PlusIcon />
          </button>
        </EdgeLabelRenderer>
      </>
    );
  }
  