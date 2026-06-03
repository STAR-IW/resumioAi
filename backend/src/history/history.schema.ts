import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class History extends Document {
    @Prop({ required: true })
    clientId: string;

    @Prop({ required: true })
    matchScore: number;

    @Prop({ type: [String] })
    missingSkills: string[];

    @Prop()
    coverLetter: string;

    @Prop({ type: [{ question: String, suggestedAnswer: String }] })
    interviewQuestions: { question: string; suggestedAnswer: string }[];
}

export const HistorySchema = SchemaFactory.createForClass(History);