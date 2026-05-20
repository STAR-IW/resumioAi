'use client'

import {useRef, useState} from "react";
import {Button} from "@/components/ui/button"
import { Card } from "./ui/card";
import {UploadCloud} from "lucide-react";
export interface FileUploadProps{
    onUpload: (text:string) => void,
}
export default function FileUpload({onUpload}: FileUploadProps ) {
    // const [file, setFile ] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [uploaded, setUploaded] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    //get dom element
    const inputRef = useRef<HTMLInputElement>(null);
    async function handleUpload(file : File | null) {
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

    async function handleDrop(e: React.DragEvent){
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        await handleUpload(file);
        setFileName(file?.name ??'');
    }


    return (
        <div>

            <Card className="p-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                    <div className="rounded-full w-6 h-6 flex items-center justify-center border border-white/30 text-sm">
                        1
                    </div>
                    <span className="font-medium">Upload your CV</span>
                </div>
                    <div>PDF · DOCX</div>
                </div>
                <input
                    ref={inputRef}
                    type='file'
                    accept=".pdf,.docx"
                    className="hidden"
                    // onChange={(e) => (setFile(e.target.files?.[0] || null))}
                    onChange={async (e) => {
                        await handleUpload(e.target.files?.[0] || null)
                        setFileName(e.target.files?.[0]?.name ?? '')
                    }}

                />
                <div  className="border border-dashed rounded-lg px-1 py-4 flex items-center justify-between"
                onDragOver={(e)=>e.preventDefault()}
                onDrop ={handleDrop}>
                    <div className="flex items-center gap-4">
                        <UploadCloud className="w-9 h-8 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Drop your CV here, or click to browse</p>
                            <p className="text-xs text-muted-foreground">PDF or DOCX · up to 10MB</p>
                        </div>
                    </div>
                    <Button variant="outline" data-testid = "select-cv"  disabled={uploaded} onClick={() =>  inputRef.current?.click()}>{uploaded? `✅  ${fileName} Uploaded Successfully` : uploaded? `Browse ${uploaded}` : "Browse"}</Button>
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                </div>

            </Card>
        </div>
    )

}