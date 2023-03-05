import { Candle } from "../../models/CandleModel";
import { ICandleRepository } from "../../repositories/ICandleRepository";

export class FindCandleUseCase {
    constructor(
        protected candleRepository: ICandleRepository
    ){}

    public async findLastCandles(quantity:number):Promise<Candle[]>{
        return await this.candleRepository.findLast(quantity)
    }
}