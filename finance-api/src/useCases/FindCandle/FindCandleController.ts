import { FindCandleUseCase } from "./FindCandleUseCase";

export class FindCandleController{
    constructor(
        protected findCandleUseCase: FindCandleUseCase
    ){}

    public async findLast(quantidy:number){
        const candles = await this.findCandleUseCase.findLastCandles(quantidy)
        return candles
        
    }
}