import { Candle } from "../../models/CandleModel";
import { ICandleRepository } from "../ICandleRepository";

export class MongoCandleRepository implements ICandleRepository{

    async save(candle: Candle): Promise<Candle> {
        const candleSave =  new Candle(candle) 
        const result =  (await candleSave.save()).toJSON()

        return result
    }
    
    async findLast(quantity:number):Promise<Candle[]>{

        const n = quantity > 0 ? quantity : 10

       return await Candle.find().sort({_id: -1}).limit(n)
    }
}