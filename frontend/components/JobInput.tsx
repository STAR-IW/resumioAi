'use client'
import {useState} from "react";
import {Button} from "@/components/ui/button";
export interface IJobInput {
    onJobInput: (text:string) => void;
}
export default function JobInput({onJobInput} : IJobInput){

    const [mode, setMode] = useState<'url' | 'paste'>('url');
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const modeChange = () =>{
        setMode(mode === 'url' ? 'paste' : 'url')
    }
     async function handleFetch(){

        const endpoint = mode === 'url' ? '/job/scrape' : '/job/paste';
        const body = mode === 'url' ? { url: inputValue } : { text: inputValue };

        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
            })
            if(!res.ok){
                const error = await res.json()
                setError(error.message)
                return
            }
            const data = await res.text() // plain text, not JSON
            onJobInput(data)
        }catch(error){
            setError('Network error, please try again later');
        }

    }

    return (
        <div>
            <Button onClick={modeChange}>{mode === 'url' ? 'paste job description' : 'add url'}</Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {mode === 'url' ?
                    (<input type="url" value={inputValue} onChange={e => {setInputValue(e.target.value); setError('')}}/>
                ) :
                (<textarea value={inputValue} onChange={e => {setInputValue(e.target.value); setError('')}} placeholder="Paste job description here"/>)}
            <Button onClick={handleFetch}>Fetch data</Button>
        </div>
    )
}