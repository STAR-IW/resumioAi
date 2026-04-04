import {Injectable, NotFoundException} from '@nestjs/common';
import {AnalyzeDto} from "./dto/analyze.dto";
import {ConfigService} from "@nestjs/config";
import {LlmService} from "../llm/llm.service";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AnalyzeService {

    constructor(private configService: ConfigService, private llmService : LlmService) {

    }
    private sessions = new Map<string, string>();

    async analyzeData(analyzeDto: AnalyzeDto) {

        const sessionId : string = uuidv4();

        const prompt = this.buildPrompt(analyzeDto.cvText, analyzeDto.jobDescription);
        const coverLetterPrompt = this.coverLetterPromptBuild(analyzeDto.cvText, analyzeDto.jobDescription);

        this.sessions.set(sessionId, coverLetterPrompt);
        const llmResponse :string = await this.llmService.generateAiContent(prompt)
        const cleanText = llmResponse.replace(/```json|```/g, '').trim();

        const response = JSON.parse(cleanText);
        return {sessionId, response}
    }

    async *streamCoverLetter(sessionId: string){
        const prompt  = this.sessions.get(sessionId);
        if (!prompt) throw new NotFoundException('Session not found')
         //iterate over stream of response
        for await (const chunk of this.llmService.streamAiContent(prompt)){
           yield {data:chunk}
        }
        this.sessions.delete(sessionId);
    }
    private buildPrompt(cvText: string, jobDescription: string): string {
        return `
        You are a senior technical recruiter and career advisor with 20 years of experience
        evaluating candidates across multiple industries.

        Carefully read the CV and job description below, then produce a structured analysis.

        CV:
        ${cvText}

        Job Description:
        ${jobDescription}

        Instructions:
        - matchScore: A realistic integer from 0 to 100 reflecting how well the CV matches
          the job requirements. Be strict and objective — do not inflate the score.
          Base it on: required skills present, years of experience, education, and role relevance.

        - missingSkills: List only skills or qualifications explicitly required or strongly
          preferred in the job description that are absent or unclear in the CV.
          Do not list nice-to-haves unless they are emphasized in the job description.

        - coverLetter: Write in first person from the candidate's perspective. 
          Tailor it specifically to the job description using evidence from the CV.
          250-350 words. Professional yet personable tone.
          Do not invent facts, credentials, or experiences not found in the CV.

        - interviewQuestions: Generate exactly 5 interview questions the hiring manager
          is likely to ask based on the job description and the candidate's CV.
          For each, provide a suggested answer grounded in the candidate's actual experience.
          Vary the question types: at least one behavioral, one technical, one situational.

        Respond ONLY with valid JSON, no markdown, no backticks:
        {
          "matchScore": <0-100>,
          "missingSkills": ["skill1", "skill2"],
          "interviewQuestions": [
            { "question": "...", "suggestedAnswer": "..." },
            { "question": "...", "suggestedAnswer": "..." },
            { "question": "...", "suggestedAnswer": "..." },
            { "question": "...", "suggestedAnswer": "..." },
            { "question": "...", "suggestedAnswer": "..." }
          ]
        }`;
    }
    private coverLetterPromptBuild(cvText: string, jobDescription: string): string{
        return `
        You are a professional career advisor and expert cover letter writer.
        Analyze the CV and job description below, then write a compelling cover letter
        tailored to the role.
        
        CV:
        ${cvText}
        
        Job Description:
        ${jobDescription}
        
        Write a professional cover letter using the following structure:
        
        Opening Paragraph: Express enthusiasm for the role and company. Mention the specific position.
        
        Body Paragraph 1: Highlight the candidate's most relevant experience and skills that match the job requirements.
        
        Body Paragraph 2: Showcase a specific achievement or project from the CV that demonstrates value for this role.
        
        Closing Paragraph: Reinforce interest in the role, invite further discussion, and thank the reader.
        
        Rules:
        - Use plain text only, no markdown, no bullet points, no special characters
        - Write in first person from the candidate's perspective
        - Keep the tone professional yet personable
        - Keep the total length between 250 and 350 words
        - Do not invent facts not present in the CV`;
    }


}


