
import { Candle } from "../../models/CandleModel";
import { CreateCandleUseCase } from "./CreateCandleUseCase";

export class CreateCandleCrontroller {
    constructor(protected createCandleUseCase: CreateCandleUseCase){}

    public async handle(candle:Candle):Promise<Candle>{
        return await this.createCandleUseCase.execute(candle)
    }

}