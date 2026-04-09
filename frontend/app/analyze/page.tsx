'use client'
import FileUpload from "@/components/FileUpload";
import JobInput from "@/components/JobInput";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import ResultsPanel from "@/components/ResultsPanel";
import type {AnalysisResult} from "@/components/ResultsPanel"
import {Spinner} from "@/components/ui/spinner";

export default function Analyze(){
    const [cvText, setCvText] = useState<string>('');
    const [jobInput, setJobInput] = useState<string>('');
    const [analyzeResult, setAnalyzeResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [coverLetter, setCoverLetter] = useState<string>('');
    const [error, setError] = useState<string | null>(null);


    async function handleAnalyze( ){
        setShowResults(false)
        setCoverLetter('')
        setError(null);
        setLoading(true);
        try{


            const resCoverLetter = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze/prepare`, {
                method: "POST",
                body: JSON.stringify({ cvText, jobDescription: jobInput }),
                headers: { 'Content-Type': 'application/json' }
            });
            const { sessionId } = await resCoverLetter.json()

            const es = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/analyze/stream/${sessionId}`)
            es.onmessage = (event) => {
                if (event.data === '[DONE]') { es.close(); return }
                setCoverLetter(prev => prev + event.data)
            }
            setShowResults(true)

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze`, {
                method: "POST",
                body: JSON.stringify({ cvText, jobDescription: jobInput }),
                headers: { 'Content-Type': 'application/json' }
            });
            if(!res.ok){throw new Error(`Request failed. ${res.status}`);}
            const data = await res.json();
            setAnalyzeResult(data);
            console.log(data);
        }catch(error){
            setError('Analysis failed. Please try again ')
        }finally {
            setLoading(false);
        }
        console.log('final coverLetter length:', coverLetter.length)

    }

    return (
        <div className='container mx-auto p-8 min-h-screen'>
            <div className="grid grid-cols-2 gap-8">
            {/*Left col*/}
            <div className="flex flex-col gap-4">
                <FileUpload onUpload={(cvText : string)=>{ console.log('cvText:', cvText); setCvText(cvText); }}></FileUpload>
                <JobInput   onJobInput = {(jobInput: string) =>{console.log('jobInput:', jobInput), setJobInput(jobInput)} }></JobInput>
                <Button onClick={handleAnalyze} disabled={!cvText || !jobInput}>Analyze
                    {loading && <Spinner data-icon="inline-start" />}
                </Button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            {/*Right col*/}
            <div>
                {showResults  && <ResultsPanel {...(analyzeResult ?? { matchScore: 0, missingSkills: [], interviewQuestions: [] })} coverLetter={coverLetter}/>}
            </div>
            </div>
        </div>
        )
}