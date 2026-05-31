import { Injectable } from '@nestjs/common';
import {History} from "./history.schema";
import { Model } from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateHistoryDto} from "./dto/create-history.dto";

@Injectable()
export class HistoryService {
    constructor(@InjectModel(History.name) private historyModel: Model<History>) {}

    async saveHistory(createHistoryDto : CreateHistoryDto) {
        const analysis = new this.historyModel(createHistoryDto);
        return analysis.save();
    }

    async getAnalysisByClientId(clientId:string){
        return this.historyModel.find({clientId}).sort({createdAt:-1});
    }

    async deleteAnalysisByAnalysisId(analysisId:string){
        return this.historyModel.findByIdAndDelete(analysisId);
    }

}
