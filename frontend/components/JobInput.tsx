'use client'
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
export interface IJobInput {
    onJobInput: (mode: 'url' | 'paste', value : string) => void;
}
export default function JobInput({onJobInput} : IJobInput){

    const [mode, setMode] = useState<'url' | 'paste'>('url');
    const [inputValue, setInputValue] = useState<string>('');
    const modeChange = () =>{
        setMode(mode === 'url' ? 'paste' : 'url')
    }

    return (
        <div>
            <Card className="p-8">
                <CardHeader>
                    <CardTitle>Add job description</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                {mode === 'url' ?
                    (<input data-testid = "input-url" className='w-full p-2 rounded-md bg-background border border-border text-foreground'  type="url" value={inputValue} placeholder="Add URL here" onChange={e => {setInputValue(e.target.value); onJobInput(mode,e.target.value); }}/>
                    ) :
                    (<textarea data-testid = "input-job-description" className='w-full p-2 rounded-md bg-background border border-border text-foreground h-32' value={inputValue} onChange={e => {setInputValue(e.target.value); onJobInput(mode,e.target.value); }} placeholder="Paste job description here"/>)}
               <div className= 'flex gap-2'>
                   <Button onClick={modeChange}>{mode === 'url' ? 'Paste job description instead' : 'Add url instead'}</Button>
               </div>

            </Card>

        </div>
    )
}

