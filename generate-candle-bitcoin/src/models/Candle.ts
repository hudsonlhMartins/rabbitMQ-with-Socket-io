import { CandleColor } from "../enums/CandleColor"

export class Candle {
    public low: number
    public high: number
    public open: number
    public close: number
    public color: CandleColor
    public finalDateTime: Date | number
    public values: number[]
    public currency: string

    constructor(currency:string){
        this.low = Infinity
        this.high = 0
        this.open = 0
        this.close = 0
        this.values = []
        this.color = CandleColor.UNDETERMINED
        this.finalDateTime = 0
        this.currency = currency
    }

    public addValue(value:number){
        this.values.push(value)

        if(this.values.length ==1){
            this.open = value
            return
        }
        if(this.low > value){
            this.low = value
            return
        }
        if(this.high < value){
            this.high = value
            return
        }
    }

    public closeCandle(){
        if(!this.values.length){
            return
        }
        this.close = this.values[this.values.length-1]
        this.finalDateTime = new Date()
        
        if(this.open > this.close){
            this.color = CandleColor.RED
            return
        }
        if(this.close > this.open){
            this.color = CandleColor.GREEN
            return
        }
    }

    public toSimpleObj():Partial<Candle> {

        const {values, ...obj} = this

        return obj
    }

}