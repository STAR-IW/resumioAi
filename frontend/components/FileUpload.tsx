'use client'

import {useState} from "react";
import {Button} from "@/components/ui/button"
export interface FileUploadProps{
    onUpload: (text:string) => void,
}
export default function FileUpload({onUpload}: FileUploadProps ) {
    const [file, setFile ] = useState<File | null>(null);

    const handleUpload = async() =>{
        console.log("handleUpload triggered ");
        if(!file){
            return
        }
        const formData = new FormData();
        formData.append("file", file)
        //sends request to nest server
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/cv`, {
            method: "POST",
            body:formData
        })
        const cvText = await res.text()

        onUpload(cvText)

    }


    return (
        <div>
            <input
                type='file'
                accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}

            />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )

}