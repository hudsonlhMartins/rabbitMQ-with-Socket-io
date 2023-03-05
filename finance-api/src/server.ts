import { config } from "dotenv";
import { app } from "./app";
import { closeDB, connectDB } from "./database";
import { CandleMessageChanel } from "./messages/CandleMessageChanel";
import { createCandleController } from "./useCases/CreateCandle";

(async()=>{

    await connectDB()

    config()
    const server = app.listen(process.env.PORT, ()=>{
        console.log('app listening port 3333')
    })

    const candleMsgChannel = new CandleMessageChanel(server, createCandleController)
    candleMsgChannel.consumeMessage()

    process.on('SIGINT', ()=>{
        // closeDB()
        server.close()
        console.log('App server and connecting to Mongo close')
    })
    
})()
