import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateHistoryDto{
    @IsNotEmpty()
    @IsString()
    clientId: string;
    @IsNumber()
    matchScore: number;
    missingSkills: string[];
    @IsString()
    coverLetter: string;
    interviewQuestions: { question: string; suggestedAnswer: string }[];}