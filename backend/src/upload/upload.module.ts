import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import {MulterModule} from "@nestjs/platform-express";

@Module({
  providers: [UploadService],
  controllers: [UploadController],
  imports: [MulterModule.register({ dest: './uploads' })]

})
export class UploadModule {}
