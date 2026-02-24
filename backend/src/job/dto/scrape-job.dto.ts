import {IsNotEmpty, IsUrl} from 'class-validator';

export class ScrapeJobDto {
    @IsNotEmpty()
    @IsUrl()
    url : string;
}