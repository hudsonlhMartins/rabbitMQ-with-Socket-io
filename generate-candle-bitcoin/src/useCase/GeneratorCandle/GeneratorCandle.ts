import { Coingecko } from "../../client/Coingecko";
import { Period } from "../../enums/Period";
import { MessageChanel } from "../../message/messageChanel";
import { Candle } from "../../models/Candle";
import config,{ IConfig } from "config"

const rabbitMq:IConfig = config.get('App.rabbitmq')
export class GeneratorCandle {
    constructor(protected price: Coingecko, protected candle: Candle){}

    public async execute(){
        const messageChanel = await MessageChanel.init()
        if(messageChanel){
            while(true){
                const loopTimes = Period.FIVE_MINUTES / Period.TEN_SECONDS
                const candle = this.candle
    
                console.log('----------------------------------------------------------')
                console.log('Generating new candle')
    
                for(let i = 0; i <loopTimes; i++){
                    const price = await this.price.getDataBitcoin()
                    candle.addValue(price)
                    console.log(`Market price #${i + 1} of ${loopTimes}`)
                    await new Promise(r=>setTimeout(r,Period.TEN_SECONDS))
                }
    
                candle.closeCandle()
                console.log('Candle Close')
                const candleObj = candle.toSimpleObj()
                console.log(candleObj)
                const candlToJson = JSON.stringify(candleObj)
                messageChanel.sendToQueue(`${rabbitMq.get('queue_name')}`, Buffer.from(candlToJson))
                console.log('Candle enqueued')
            }
        }
    }
}