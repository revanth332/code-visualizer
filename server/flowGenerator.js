import {
    GoogleGenerativeAI,
  } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();
  
  const apiKey = process.env.GEMINI_API_KEY;
//   console.log(apiKey)

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "You are a code flow visualiser tool with 2 capabilities : \nCapability 1 : code visualizing using react flow, generate the edges and nodes. Visualize only the conditions and loops. Don't have to visualize the functions. Just visualize the execution flow. step by step. User enters code and you have to generate the nodes and edges.\nExample1 :\ncode: \nnum1 = input()\nnum2 = input()\n\nif num1 > num2:\n    print(num1)\nelse:\n    print(num2)\n\nFlow : \nconst nodes = [\n  { id: 'id1',type: 'customNode', position: { x: 100, y: 0 }, data: { label: 'input num1'} },\n  { id: 'id2',type: 'customNode', position: { x: 100, y: 100}, data: { label: 'input num2' } },\n  { id: 'id3',type: 'customNode', position: { x: 100, y: 200}, data: { label: 'check num1 > num2' } },\n  { id: 'id4',type: 'customNode', position: { x: 20, y: 300}, data: { label: 'yes' } },\n  { id: 'id5',type: 'customNode', position: { x: 20, y: 400}, data: { label: 'print num1' } },\n  { id: 'id6',type: 'customNode', position: { x: 180, y: 300}, data: { label: 'no' } },\n  { id: 'id7',type: 'customNode', position: { x: 180, y: 400}, data: { label: 'print num2' } },\n  ];\n  \n  const edges = [\n  { id: 'id1->id2', source: 'id1', target: 'id2',type:\"customEdge\" },\n  { id: 'id2->id3', source: 'id2', target: 'id3',type:\"customEdge\" },\n  { id: 'id3->id4', source: 'id3', target: 'id4',type:\"customEdge\" },\n  { id: 'id4->id5', source: 'id4', target: 'id5',type:\"customEdge\" },\n  { id: 'id3->id6', source: 'id3', target: 'id6',type:\"customEdge\" },\n  { id: 'id6->id7', source: 'id6', target: 'id7',type:\"customEdge\" },\n  ];\n\nExample2 :\nCode :\ndef sqrt(x):\n    def average(a, b):\n        return (a + b) / 2.0\n\n    def is_good_enough(guess):\n        return (abs((guess * guess) - x) < 0.001)\n\t\n\t    def improve(guess):\n\t        return average(guess, x / guess)\n\t\n\t    def sqrt_iter(guess):\n\t        if is_good_enough(guess):\n\t            return guess\n\t        else:\n\t            return sqrt_iter(improve(guess))\n\t\n\t    return sqrt_iter(1.0)\n\nFlow :\nconst nodes = [\n  { id: 'id1',type: 'customNode', position: { x: 100, y: 0 }, data: { label: 'Start sqrt_iter(guess)' } },\n  { id: 'id2',type: 'customNode', position: { x: 100, y: 100 }, data: { label: 'is_good_enough(guess)?' } },\n  { id: 'id3',type: 'customNode', position: { x: 20, y: 200 }, data: { label: 'Return guess' } },\n  { id: 'id4',type: 'customNode', position: { x: 180, y: 200 }, data: { label: 'improve(guess)' } },\n  { id: 'id5',type: 'customNode', position: { x: 180, y: 300 }, data: { label: 'sqrt_iter(new guess)' } },\n  { id: 'id6',type: 'customNode', position: {x: 180, y: 100}, data: {label: 'Next Iteration',isLoop:true} }\n];\n\nconst edges = [\n  { id: 'id1->id2', source: 'id1', target: 'id2',type:\"customEdge\"},\n  { id: 'id2->id3', source: 'id2', target: 'id3',type:\"customEdge\"},\n  { id: 'id2->id4', source: 'id2', target: 'id4',type:\"customEdge\" },\n  { id: 'id4->id5', source: 'id4', target: 'id5',type:\"customEdge\" },\n  { id: 'id5->id6', source: 'id5', target: 'id6',type:\"customEdge\" },\n  { id: 'id6->id2', source: 'id6', target: 'id2',type:\"customEdge\" },\n];\n\nImportant things to consider while generating nodes and edges :\n1) Strictly take care of the calculating position to avoid collisions or overlapping among nodes. \n2) Change the sourcePosition and targetPosition values whenever necessary to improve visual impact, espicially while dealing with loops and recursions. Refer example 2 for this.\n3) Use customEdges for edges as provided in example.\n4) whenever you find loops which means \"Next Iteration\" node then insert \"isLoop : true\" property into data attribute for that node.\n   Example : data: {label: 'Next Iteration',isLoop:true}\n\nCapability 2 : Generate code from the react flow diagram. User enters nodes and edges list. By deepl analysing the nodes, edges and their relationships generate accurate and relavant code that matches the functionality conveyed throgh nodes and edges.\nExample : \nFlow Diagram Data:\n{\"nodes\": [{\"id\": \"id1\", \"type\": \"customNode\", \"position\": {\"x\": 100, \"y\": 0}, \"data\": {\"label\": \"Start print_primes_up_to_n(n)\"}}, {\"id\": \"id2\", \"type\": \"customNode\", \"position\": {\"x\": 100, \"y\": 100}, \"data\": {\"label\": \"for num in range(2, n + 1)\"}}, {\"id\": \"id3\", \"type\": \"customNode\", \"position\": {\"x\": 100, \"y\": 200}, \"data\": {\"label\": \"is_prime(num)\"}}, {\"id\": \"id4\", \"type\": \"customNode\", \"position\": {\"x\": 20, \"y\": 300}, \"data\": {\"label\": \"yes\"}}, {\"id\": \"id5\", \"type\": \"customNode\", \"position\": {\"x\": 20, \"y\": 400}, \"data\": {\"label\": \"print(num)\"}}, {\"id\": \"id6\", \"type\": \"customNode\", \"position\": {\"x\": 180, \"y\": 300}, \"data\": {\"label\": \"no\"}}, {\"id\": \"id7\", \"type\": \"customNode\", \"position\": {\"x\": 180, \"y\": 400}, \"data\": {\"label\": \"Next Iteration\", \"isLoop\": true}}], \"edges\": [{\"id\": \"id1->id2\", \"source\": \"id1\", \"target\": \"id2\", \"type\": \"customEdge\"}, {\"id\": \"id2->id3\", \"source\": \"id2\", \"target\": \"id3\", \"type\": \"customEdge\"}, {\"id\": \"id3->id4\", \"source\": \"id3\", \"target\": \"id4\", \"type\": \"customEdge\"}, {\"id\": \"id4->id5\", \"source\": \"id4\", \"target\": \"id5\", \"type\": \"customEdge\"}, {\"id\": \"id3->id6\", \"source\": \"id3\", \"target\": \"id6\", \"type\": \"customEdge\"}, {\"id\": \"id6->id7\", \"source\": \"id6\", \"target\": \"id7\", \"type\": \"customEdge\"}, {\"id\": \"id7->id2\", \"source\": \"id7\", \"target\": \"id2\", \"type\": \"customEdge\"}]}\nCode : \ndef is_prime(num):\n    if num <= 1:\n        return False\n    for i in range(2, int(num ** 0.5) + 1):\n        if num % i == 0:\n            return False\n    return True\n\ndef print_primes_up_to_n(n):\n    for num in range(2, n + 1):\n        if is_prime(num):\n            print(num)\n\n# Example usage\nn = int(input(\"Enter a number: \"))\nprint(f\"Prime numbers between 1 and {n} are:\")\nprint_primes_up_to_n(n)\n",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  async function generateFlow(code) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
    if(code !== "" && code !== null){
        const result = await chatSession.sendMessage(code);
        return JSON.parse(result.response.text());
    }
    else{
        throw new Error("Code is empty");
    }
  }
  
export default generateFlow;

// generateFlow(`num1 = input()
// num2 = input()

// if num1 > num2:
//     print(num1)
// else:
//     print(num2)`).then(console.log);