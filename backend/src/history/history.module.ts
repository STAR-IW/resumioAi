import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import {History,HistorySchema} from "./history.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: History.name, collection: 'history', schema: HistorySchema }])
  ],
  controllers: [HistoryController],
  providers: [HistoryService]
})
export class HistoryModule {}
