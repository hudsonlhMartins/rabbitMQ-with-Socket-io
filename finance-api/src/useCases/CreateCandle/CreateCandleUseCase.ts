import { Candle } from "../../models/CandleModel";
import { ICandleRepository } from "../../repositories/ICandleRepository";

export class CreateCandleUseCase {
    constructor( protected candleRepository: ICandleRepository){}

    public async execute(candle:Candle){
        const newCandle = this.candleRepository.save(candle)
        return newCandle
    }

}