'use client'
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useState} from "react";

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
        <div>
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Match score</AccordionTrigger>
                    <AccordionContent>
                        <Badge className={matchScore >=70 ? "bg-green-500 " : matchScore>= 40 ? "bg-yellow-500" : "bg-red-500"}>{matchScore}%</Badge>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Missing Skills</AccordionTrigger>
                    <AccordionContent>
                        {missingSkills.map((s,i) =><Badge key={i}>{s}</Badge>)}
                    </AccordionContent>
                </AccordionItem >
                <AccordionItem  value="item-3" className="whitespace-pre-wrap">
                    <AccordionTrigger>Cover letter</AccordionTrigger>
                    <AccordionContent>
                        {coverLetter}
                        <Button onClick={handleCopy}>{copied ? 'Copied!' : 'Copy'}</Button>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="whitespace-pre-wrap">
                    <AccordionTrigger>Interview Questions</AccordionTrigger>
                    <AccordionContent>
                        {interviewQuestions.map((item, i) => (
                            <div key={i}>
                                <p className="font-semibold">{item.question}</p>
                                <p className="text-muted-foreground mt-1">{item.suggestedAnswer}</p>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}