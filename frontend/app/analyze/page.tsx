'use client'
import FileUpload from "@/components/FileUpload";
import JobInput from "@/components/JobInput";
import {useState} from "react";

export default function Analyze(){
    const [cvText, setCvText] = useState<string>('');

    return (
        <div className='container mx-auto p-8'>
            <div className="grid grid-cols-2 gap-8">
                <FileUpload onUpload={(cvText : string)=>{ console.log('cvText:', cvText); setCvText(cvText); }}></FileUpload>
                <JobInput></JobInput>

            </div>
        </div>
        )
}