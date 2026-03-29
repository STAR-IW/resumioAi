'use client'

import {useRef, useState} from "react";
import {Button} from "@/components/ui/button"
import { Card } from "./ui/card";
export interface FileUploadProps{
    onUpload: (text:string) => void,
}
export default function FileUpload({onUpload}: FileUploadProps ) {
    const [file, setFile ] = useState<File | null>(null);
    const [uploaded, setUploaded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    //get dom element
    const inputRef = useRef<HTMLInputElement>(null);
    const handleUpload = async() =>{
        // console.log("handleUpload triggered ");
        if(!file){
            return
        }
        const formData = new FormData();
        formData.append("file", file)
        //sends request to nest server
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/cv`, {
                method: "POST",
                body:formData
            });
            if(!res.ok){
                const error = await res.json()
                setError(error.message)
                return
            }
            const cvText = await res.text()

            onUpload(cvText)
            setUploaded(true);
        }catch (error){
            setError('Network error, please try again later');
        }

    }


    return (
        <div>
            <Card className="p-8">
                <input
                    ref={inputRef}
                    type='file'
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <Button  disabled={uploaded} onClick={() => file? handleUpload() : inputRef.current?.click()}>{uploaded? '✅ CV Uploaded Successfully' : file? `Upload ${file.name}` : "Select CV"}</Button>
                {error && <p className='text-red-500 text-sm'>{error}</p>}
            </Card>
        </div>
    )

}