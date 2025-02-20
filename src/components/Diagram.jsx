import { useCallback,useState,useRef, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Background 
} from '@xyflow/react';
import CustomEdge from './CustomEdge';

import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import { Loader2 } from 'lucide-react';
import ConnectionLine from './ConnectionLine';


const edgeTypes = {
  customEdge: CustomEdge,
};

let id = 1;
const getId = () => `${id++}`;
// const nodeOrigin = [0.5, 0];

const nodeTypes = { customNode: CustomNode };

function Diagram({nodes,edges,setEdges,onEdgesChange,onNodesChange,handleCodeGeneration}) {
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition,setNodes } = useReactFlow();
  const [isLoading,setIsLoading] = useState(false);

  const onConnect = useCallback(
    (connection) => {
      console.log(connection);
      const edge = { ...connection, type: 'customEdge',markerEnd: {"type": "arrowclosed",width: 10,height: 10,color: '#fa7ab3'},
      style: {strokeWidth: 2,stroke: '#fa7ab3',}};
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges],
  );

  useEffect(() => {
    console.log(edges);
  },[edges])

  const onConnectEnd = useCallback(
    (event, connectionState) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        console.log(connectionState,event);
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: `Node ${id}`,handlerTypes:{top : connectionState.fromPosition === "bottom" ? "target" : "source",left:connectionState.fromPosition === "right" ? "target" : "source",right:connectionState.fromPosition === "left" ? "target" : "source",bottom:connectionState.fromPosition === "top" ? "target" : "source"}},
          origin: [0.5, 0.0],
          type:"customNode"
        };
 
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectionState.fromNode.id,sourceHandle:connectionState.fromHandle.id,target: id,type:"customEdge",
            markerEnd: {"type": "arrowclosed",width: 10,height: 10,color: '#fa7ab3'},
            style: {strokeWidth: 2,stroke: '#fa7ab3',}}),
        );
      }
    },
    [screenToFlowPosition],
  );

  const handleSubmit = async () => {
    setIsLoading(true);
    await handleCodeGeneration();
    setIsLoading(false);
  }

  return (
    <div ref={reactFlowWrapper} className='h-full w-full bg-code-bg'>
      <div className='h-[92%]'>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectEnd={onConnectEnd}
            // connectionLineComponent={ConnectionLine}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background  />
          </ReactFlow>
      </div> 
      <div className='flex justify-end items-center h-[8%]'>
        <button onClick={handleSubmit} className='p-2 rounded-lg bg-green-600 text-white cursor-pointer min-w-[130px] flex justify-center'>{ isLoading ? <Loader2 className="animate-spin" /> : "Submit" }</button>
      </div>
    </div>

  );
}

export default function FlowDiagram({nodes,edges,setEdges,onEdgesChange,onNodesChange,handleCodeGeneration}) {
  return <ReactFlowProvider>
    <Diagram edges={edges} nodes={nodes} onNodesChange={onNodesChange} setEdges={setEdges} onEdgesChange={onEdgesChange} handleCodeGeneration={handleCodeGeneration} />
  </ReactFlowProvider>
};
