import {
    BadRequestException,
    Controller,
    NotAcceptableException,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors
} from '@nestjs/common';
import {AnyFilesInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {UploadService} from "./upload.service";
import {memoryStorage} from "multer";

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService){}
    @Post('/cv')
    //used AnyFilesInterceptor instead FileInterceptor because nest integration problem
    @UseInterceptors(AnyFilesInterceptor({ storage: memoryStorage(),limits: { fileSize: 5 * 1024 * 1024 } // 5MB file limit
    }))
    uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
        if(!files || files.length === 0){
            throw new BadRequestException('No files uploaded');
        }
        const file = files[0]; // take first file only
        return this.uploadService.fileParser(file)
    }

    /*
    * @Post('/cv')
    //used AnyFilesInterceptor instead FileInterceptor because nest integration problem
    @UseInterceptors(AnyFilesInterceptor())
    uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
        const file = files[0]; // take first file only
        console.log('route hit');
        console.log(files);
        return { files: files.map(f => f.originalname) };
    }*/
}
