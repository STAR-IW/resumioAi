'use client'
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Card, CardTitle} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";

export type AnalysisResult = {
    matchScore : number
    missingSkills : string[]
    interviewQuestions : { question : string, suggestedAnswer: string}[]
}

interface ResultsPanelProps extends AnalysisResult {
    coverLetter: string
}
export default function ResultsPanel({matchScore, missingSkills,coverLetter, interviewQuestions} : ResultsPanelProps) {
    //for button ui text update
    const [copied, setCopied] = useState<boolean>(false);


    const  handleCopy = async () =>{
        try{
            await navigator.clipboard.writeText(coverLetter)
            setCopied(true);
            setTimeout(()=>{setCopied(false)}, 2000);
        }catch (error){
            console.log('Failed to copy',error);
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <Card className="p-4">
                <CardTitle className='p-1 m-2 text-lg'>Match Score</CardTitle>
                <div className="flex items-center gap-4 m-2 ">
                    <Progress value={matchScore}   className={`flex-1  ${matchScore >= 70 ? '[&>div]:bg-green-500' : matchScore >= 40 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500 '} `}
                    />
                    <span className="font-bold text-lg m-2">{matchScore}%</span>
                </div>

            </Card>
            <Card className="p-4">
                <CardTitle>Missing Skills</CardTitle>
                <div className="flex flex-wrap gap-2">
                    {missingSkills.map((s,i) =><Badge key={i}>{s}</Badge>)}
                </div>
            </Card>
            <Card className="p-4">
                <CardTitle>Cover Letter</CardTitle>
                {coverLetter}
                <Button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</Button>
            </Card>
            <Card className="p-4">
                <CardTitle>Interview Questions</CardTitle>
                {interviewQuestions.map((item, i) => (
                    <div key={i}>
                        <p className="font-semibold">{item.question}</p>
                        <p className="text-muted-foreground mt-1">{item.suggestedAnswer}</p>
                    </div>
                ))}
            </Card>
        </div>
    )
}