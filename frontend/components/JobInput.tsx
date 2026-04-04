'use client'
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardAction, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
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
            <Card className="p-8">
                <CardHeader>
                    <CardTitle>Add job description</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {mode === 'url' ?
                    (<input className='w-full p-2 rounded-md bg-background border border-border text-foreground'  type="url" value={inputValue} placeholder="Add URL here" onChange={e => {setInputValue(e.target.value); setError('')}}/>
                    ) :
                    (<textarea className='w-full p-2 rounded-md bg-background border border-border text-foreground h-32' value={inputValue} onChange={e => {setInputValue(e.target.value); setError('')}} placeholder="Paste job description here"/>)}
               <div className= 'flex gap-2'>
                   <Button onClick={modeChange}>{mode === 'url' ? 'Paste job description instead' : 'Add url instead'}</Button>
                   <Button onClick={handleFetch}>Fetch data</Button>
               </div>

            </Card>

        </div>
    )
}

