import { Channel, connect} from "amqplib";
import { CreateCandleCrontroller } from "../useCases/CreateCandle/CreateCandleConbtroller";
import { Server } from "socket.io"
import http from 'http'
import { config } from "dotenv";
import { Candle } from "../models/CandleModel";


config()

export class CandleMessageChanel{
    private chanel: Channel
    private createCandleController: CreateCandleCrontroller
    private io: Server

    constructor(server: http.Server, createCandle: CreateCandleCrontroller){
        this.createCandleController = createCandle
        this.io = new Server(server, {
            cors: {
                origin: process.env.SOCKET_CLIENT_SERVER,
                methods: ["GET", "POST"]
            }
        })

        this.io.on('connection', ()=> console.log('Web socket Create'))
    }

    private async createMessageChanel(){
        try{
            const connection = await connect(process.env.AMQP_SERVER)
            this.chanel = await connection.createChannel()
            this.chanel.assertQueue(process.env.QUEUE_NAME)

        }catch(err){
            console.log('Connection to RabbitMq falied')
            console.log(err)
        }
    } 

    public async consumeMessage(){
        await this.createMessageChanel()

        if(this.chanel){
            this.chanel.consume(process.env.QUEUE_NAME, async(msg)=>{
                const candleObj = JSON.parse(msg.content.toString())
                console.log('Message received')
                console.log(candleObj)
                this.chanel.ack(msg)
    
                const candle: Candle = candleObj
    
                const candleSave = await this.createCandleController.handle(candle)
                console.log('candle saved to database')
    
                this.io.emit(process.env.SOCKET_EVENT_NAME, candleSave)
                console.log('new candle emited nby web socket')
    
    
            })

            console.log('Candle Consume Start')
        }

    }
}