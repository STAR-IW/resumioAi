'use client'
import FileUpload from "@/components/FileUpload";
import JobInput from "@/components/JobInput";
import {useState} from "react";
import {Button} from "@/components/ui/button";



export default function Analyze(){
    const [cvText, setCvText] = useState<string>('');
    const [jobInput, setJobInput] = useState<string>('');
    const [analyzeResult, setAnalyzeResult] = useState<string>('');

    async function handleAnalyze( ){

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
            method: "POST",
            body: JSON.stringify({ cvText, jobDescription: jobInput }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        setAnalyzeResult(data);
        console.log(data);
    }

    return (
        <div className='container mx-auto p-8'>
            <div className="grid grid-cols-2 gap-8">
                <FileUpload onUpload={(cvText : string)=>{ console.log('cvText:', cvText); setCvText(cvText); }}></FileUpload>
                <JobInput   onJobInput = {(jobInput: string) =>{console.log('jobInput:', jobInput), setJobInput(jobInput)} }></JobInput>
                <Button onClick={handleAnalyze} disabled={!cvText || !jobInput}>Analyze</Button>
            </div>
        </div>
        )
}