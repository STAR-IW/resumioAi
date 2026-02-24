import {Injectable, NotAcceptableException} from '@nestjs/common';
import { PDFParse } from 'pdf-parse'
import mammoth from "mammoth";

const SUPPORTED_MIME_TYPES = {
    PDF: 'application/pdf',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
}


@Injectable()
export class UploadService {

    async fileParser(file: Express.Multer.File){
        if(file.mimetype === SUPPORTED_MIME_TYPES.PDF)
            return this.parsePdf(file)
        if(file.mimetype === SUPPORTED_MIME_TYPES.DOCX)
            return this.parseDocx(file)
        else{
            throw new NotAcceptableException(`${file.mimetype} file type not supported`);
        }
    }
    async parsePdf(file: Express.Multer.File){
        const parser = new PDFParse({data:file.buffer})
        const result = await parser.getText();
        return result.text;
    }
    async parseDocx(file: Express.Multer.File){
        const result = await mammoth.extractRawText({buffer: file.buffer})
        return result.value
    }

}
