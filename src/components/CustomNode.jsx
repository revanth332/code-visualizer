import React, { useCallback,useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Trash2 } from 'lucide-react';

// const handleStyle = { left: 10 };

function CustomNode({id, data }) {
  const [nodeText, setNodeText] = useState(data.label);
  const {setNodes,setEdges} = useReactFlow();

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const handleLabelChange = (e) => {
    setNodeText(e.target.value);
    setNodes(ns => ns.map(n => n.id === id ? { ...n, data: { ...n.data, label: e.target.value } } : n));
  }

  const handleDeleteNode = () => {
    setNodes(ns => ns.filter(n => n.id !== id));
    setEdges(es => es.filter(e => e.source !== id && e.target !== id))
  }

  return (
    <>
      {
        data?.isLoop ? <Handle type="target" position={Position.Left} /> : <Handle type="target" position={Position.Top} />
      }

      {/* <Handle style={{background: '#fa7ab3'}} type={data.handlerTypes.left} position={Position.Left} id="leftHanlder" /> <Handle style={{background: '#fa7ab3'}} type={data.handlerTypes.top} position={Position.Top} id="topHanlder"/> */}
      <div className=' border-node-border text-text-primary rounded-lg min-w-[100px] text-center'>
        <div className='bg-node-bg rounded-t-lg px-1 flex justify-between items-center'>
          <div className='flex items-center'>
            <span className='bg-red-500 rounded-full h-2 w-2 inline-block mr-1'></span>
            <span className='bg-yellow-500 rounded-full h-2 w-2 inline-block mr-1'></span>
            <span className='bg-green-500 rounded-full h-2 w-2 inline-block mr-1'></span>
          </div>
          <div>
            <button onClick={handleDeleteNode}><Trash2 className='h-3 w-3 text-red-400' /></button>
          </div>
        </div>
        <div className='p-2 bg-node-bg/60 rounded-b-lg'>
          <input value={nodeText} onChange={handleLabelChange} type="text" /> 
        </div>
      </div>
      {
        data?.isLoop ? <Handle type="source" position={Position.Right} id="a" /> : <Handle type="source" position={Position.Bottom} id="a" />
      }
      {/* <Handle style={{background: '#fa7ab3'}} type={data.handlerTypes.right} position={Position.Right} id="rightHandler" /> <Handle style={{background: '#fa7ab3'}} type={data.handlerTypes.bottom} position={Position.Bottom} id="bottomHandler" /> */}
      {/* <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} /> */}
    </>
  );
}

export default CustomNode;
