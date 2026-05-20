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

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full w-6 h-6 flex items-center justify-center border border-white/30 text-sm">
                            2
                        </div>
                        <span className="font-medium">Add the job description</span>
                    </div>
                    <div className= 'flex gap-2'>
                        <Button variant="outline" onClick={modeChange}>{mode === 'url' ? 'Paste' : 'Url'}</Button>
                    </div>
                </div>

                {mode === 'url' ?
                    (<input data-testid = "input-url" className='w-full p-2 rounded-md bg-background border border-border text-foreground'  type="url" value={inputValue} placeholder="https://company.com/jobs/senior-engineer" onChange={e => {setInputValue(e.target.value); onJobInput(mode,e.target.value); }}/>
                    ) :
                    (<textarea data-testid = "input-job-description" className='w-full p-2 rounded-md bg-background border border-border text-foreground h-32' value={inputValue} onChange={e => {setInputValue(e.target.value); onJobInput(mode,e.target.value); }} placeholder="Paste the full job posting here - title, responsibilities, requirements, everything."/>)}
               {/*<div className= 'flex gap-2'>*/}
               {/*    <Button onClick={modeChange}>{mode === 'url' ? 'Paste' : 'Url'}</Button>*/}
               {/*</div>*/}

            </Card>

        </div>
    )
}

