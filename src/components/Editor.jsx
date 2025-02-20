import React, {useState,useRef} from 'react'
import Editor from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';

export default function CodeEditor({handleFlowDiagramGeneration,code,setCode,language,setLanguage}) {
    const [isLoading,setIsLoading] = useState(false);
    const editorRef = useRef(null);

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
      }

    const handleSubmit = async () => {
        setIsLoading(prev => !prev);
        console.log(code);
        await handleFlowDiagramGeneration(editorRef.current.getValue());
        setIsLoading(false);
    }

  return (
    <div className='h-full w-full flex flex-col'>
        <div className='h-[10%] flex bg-code-bg w-full justify-between items-center p-2'>
            <h2 className='text-text-primary'>Code Editor</h2>
            <div className='bg-slate-700 text-text-primary p-2 rounded-lg'>
                <select onChange={(e) => setLanguage(e.target.value)} className='bg-slate-700 text-white'>
                    <option value="javascript">javascript</option>
                    <option value="python">python</option>
                    <option value="java">java</option>
                </select>
            </div>
        </div>
        <div className='h-[82%]'>
            <Editor onChange={value => setCode(value)} value={code} onMount={handleEditorDidMount} theme='vs-dark' className='bg-code-bg w-full' language={language} />
        </div>
        <div className='h-[8%] bg-code-bg flex justify-end items-center px-2'>
            <button onClick={handleSubmit} className='p-2 rounded-lg bg-green-600 text-white cursor-pointer min-w-[130px] flex justify-center'>{ isLoading ? <Loader2 className="animate-spin" /> : "Generte Flow" }</button>
        </div>
    </div>
  )
}
