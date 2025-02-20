import React,{useState} from 'react'
// import Diagram from './components/Diagram'
import CodeEditor from './components/Editor'
import Navbar from './components/Navbar'
import axios from 'axios';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
  Background 
} from '@xyflow/react';
import FlowDiagram from './components/Diagram';
import '@xyflow/react/dist/style.css';

// const initialNodes = [
//   { id: 'id1',type: 'customNode', position: { x: 100, y: 0 }, data: { label: 'input a' }},
//   { id: 'id2',type: 'customNode', position: { x: 100, y: 100 }, data: { label: 'input b' } },
//   { id: 'id3',type: 'customNode', position: { x: 100, y: 200 }, data: { label: 'input c' } },
//   { id: 'id4',type: 'customNode', position: { x: 100, y: 300 }, data: { label: 'check a > b' } },
//   { id: 'id5',type: 'customNode', position: { x: 20, y: 400 }, data: { label: 'yes' } },
//   { id: 'id6',type: 'customNode', position: { x: 180, y: 400 }, data: { label: 'no' } },
//   { id: 'id7',type: 'customNode', position: { x: 20, y: 500 }, data: { label: 'check a > c' } },
//   { id: 'id8',type: 'customNode', position: { x: 20, y: 600 }, data: { label: 'yes' } },
//   { id: 'id9',type: 'customNode', position: { x: 20, y: 700 }, data: { label: 'print a' } },
//   { id: 'id10',type: 'customNode', position: { x: 40, y: 600 }, data: { label: 'no' } },
//   { id: 'id11',type: 'customNode', position: { x: 40, y: 700 }, data: { label: 'print c' } },
//   { id: 'id12',type: 'customNode', position: { x: 180, y: 500 }, data: { label: 'check b > c' } },
//   { id: 'id13',type: 'customNode', position: { x: 160, y: 600 }, data: { label: 'yes' } },
//   { id: 'id14',type: 'customNode', position: { x: 160, y: 700 }, data: { label: 'print b' } },
//   { id: 'id15',type: 'customNode', position: { x: 200, y: 600 }, data: { label: 'no' } },
//   { id: 'id16',type: 'customNode', position: { x: 200, y: 700 }, data: { label: 'print c' } },

// ];

// const initialEdges = [
//   { id: 'id1->id2',type:"customEdge", source: 'id1', target: 'id2' },
//   { id: 'id2->id3',type:"customEdge", source: 'id2', target: 'id3' },
//   { id: 'id3->id4', source: 'id3', target: 'id4', type:"customEdge" },
//   { id: 'id4->id5', source: 'id4', target: 'id5', type:"customEdge" },
//   { id: 'id4->id6', source: 'id4', target: 'id6', type:"customEdge" },
//   { id: 'id5->id7', source: 'id5', target: 'id7', type:"customEdge" },
//   { id: 'id7->id8', source: 'id7', target: 'id8', type:"customEdge" },
//   { id: 'id8->id9', source: 'id8', target: 'id9', type:"customEdge" },
//   { id: 'id7->id10', source: 'id7', target: 'id10', type:"customEdge" },
//   { id: 'id10->id11', source: 'id10', target: 'id11', type:"customEdge" },
//   { id: 'id6->id12', source: 'id6', target: 'id12', type:"customEdge" },
//   { id: 'id12->id13', source: 'id12', target: 'id13', type:"customEdge" },
//   { id: 'id13->id14', source: 'id13', target: 'id14', type:"customEdge" },
//   { id: 'id12->id15', source: 'id12', target: 'id15', type:"customEdge" },
//   { id: 'id15->id16', source: 'id15', target: 'id16', type:"customEdge" },
// ];

const initialNodes = [
  {
    id: '0',
    data: { label: 'Start',handlerTypes:{top:"target",bottom:"source",left:"target",right:"target"} },
    position: { x: 0, y: 50 },
    type:"customNode"
  },
];

export default function App() {
  const [code,setCode] = useState("");
  // const [code,setCode] = useState("def is_prime(num):\n    if num <= 1:\n        return False\n    for i in range(2, int(num**0.5) + 1):\n        if num % i == 0:\n            return False\n    return True\n\ndef print_primes_up_to_n(n):\n    for num in range(2, n + 1):\n        if is_prime(num):\n            print(num)\n\n# Example Usage:\nn = int(input(\"Enter a number: \"))\nprint_primes_up_to_n(n)");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [language,setLanguage] = useState("javascript");

  const handleFlowDiagramGeneration = async (code) => {
    console.log("click",nodes,edges)
    try{
      const response = await axios.post("http://localhost:3000/generateFlow",{code});
      console.log(response);
      setNodes(response.data.nodes);
      setEdges(response.data.edges);
    }
    catch(err){
      console.log(err);
    }
  }

  const handleCodeGeneration = async () => {
    console.log("click")
    // console.log(nodes,edges,language);
    try{
      const response = await axios.post("http://localhost:3000/generateCode",{flowDiagramData:{nodes,edges,language}});
      console.log(response);
      setCode(response.data.code);  
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className='h-screen w-screen grid grid-cols-12 grid-rows-12'>
      <div className='row-span-1 col-span-full bg-gray-50'>
        <Navbar />
      </div>
      <div className='row-span-11 col-span-5 bg-gray-100'>
        <CodeEditor language={language} setLanguage={setLanguage} handleFlowDiagramGeneration={handleFlowDiagramGeneration} code={code} setCode={setCode} />
      </div>
      <div className='row-span-11 col-span-7 bg-gray-200'>
        <FlowDiagram edges={edges} nodes={nodes} onNodesChange={onNodesChange} setEdges={setEdges} onEdgesChange={onEdgesChange} handleCodeGeneration={handleCodeGeneration} />
      </div>
    </div>
  )
}
