import {IsNotEmpty, IsString} from "class-validator";

export class PasteJobDto {
    @IsNotEmpty()
    @IsString()
    text : string;
}