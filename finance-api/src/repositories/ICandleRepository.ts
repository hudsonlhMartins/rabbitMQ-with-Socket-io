import { Candle } from "../models/CandleModel"

export interface ICandleRepository{
  
    save(candle:Candle):Promise<Candle>
    findLast(quantity:number):Promise<Candle[]>
}