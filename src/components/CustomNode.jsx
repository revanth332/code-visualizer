import React, { useCallback,useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

// const handleStyle = { left: 10 };

function CustomNode({id, data }) {
  const [nodeText, setNodeText] = useState(data.label);
  const {setNodes} = useReactFlow();

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const handleLabelChange = (e) => {
    setNodeText(e.target.value);
    setNodes(ns => ns.map(n => n.id === id ? { ...n, data: { ...n.data, label: e.target.value } } : n));
  }

  return (
    <>
      {
        data?.isLoop ? <Handle type="target" position={Position.Left} /> : <Handle type="target" position={Position.Top} />
      }
      <div className=' border-node-border text-text-primary rounded-lg min-w-[100px] text-center'>
        <div className='bg-node-bg rounded-t-lg flex items-center p-1'>
          <span className='bg-red-500 rounded-full h-2 w-2 inline-block mr-1'></span>
          <span className='bg-yellow-500 rounded-full h-2 w-2 inline-block mr-1'></span>
          <span className='bg-green-500 rounded-full h-2 w-2 inline-block mr-1'></span>
        </div>
        <div className='p-2 bg-node-bg/60 rounded-b-lg'>
          <input value={nodeText} onChange={handleLabelChange} type="text" /> 
        </div>
      </div>
      {
        data?.isLoop ? <Handle type="source" position={Position.Right} id="a" /> : <Handle type="source" position={Position.Bottom} id="a" />
      }
      
      {/* <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} /> */}
    </>
  );
}

export default CustomNode;
