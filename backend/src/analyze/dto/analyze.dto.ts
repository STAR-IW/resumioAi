import {IsNotEmpty, IsOptional, IsString} from "class-validator";


export class AnalyzeDto{
    @IsString()
    @IsNotEmpty()
    cvText: string;
    @IsString()
    @IsNotEmpty()
    jobDescription: string;
    @IsString()
    @IsOptional()
    userApiKey: string;
}