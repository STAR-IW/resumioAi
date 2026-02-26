import {BadRequestException, Injectable} from '@nestjs/common';
import {ScrapeJobDto} from "./dto/scrape-job.dto";
import axios from "axios";
import * as cheerio from 'cheerio';
import {PasteJobDto} from "./dto/paste-job.dto";

@Injectable()
export class JobService {


    async scrapJob(scrapeJobDto:ScrapeJobDto) {

        if(scrapeJobDto.url.includes('linkedin.com') ){
            throw new BadRequestException("LinkedIn  doesn't support this, please past job description");
        }

        try {
            //fetch the page HTML
            const response = await axios.get(scrapeJobDto.url);
            const $ = cheerio.load(response.data);
            $('script, style, nav, footer, header, iframe,img').remove();

            return $('body').text().replace(/\s+/g, ' ').trim();
            // return response.data;

        } catch (error) {
            throw new BadRequestException('Failed getting the job details. Try pasting the job description instead');
        }
    }

    async pasteJob(pasteJobDto:PasteJobDto) {
        if(!pasteJobDto.text){
            throw new BadRequestException('Job description doesn\'t exist');
        }
        return pasteJobDto.text;
    }
}
