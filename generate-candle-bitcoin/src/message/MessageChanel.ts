import config,{ IConfig } from "config"
import {connect,Channel} from 'amqplib'

const rabbitMq:IConfig = config.get('App.rabbitmq')
export class MessageChanel{
    constructor(){}

    static async init(): Promise<Channel>{
        const messageChanel = new MessageChanel()
        const message = await messageChanel.connect()
        return message
    }

    protected async connect():Promise<Channel>{

        try{
            const connection = await connect(`${rabbitMq.get('amqp_server')}`)
            const chanel = await connection.createChannel()
            await chanel.assertQueue(`${rabbitMq.get('queue_name')}`)
            console.log('Connected to RabbitMQ')
            return chanel
        }catch(err){
            console.log('Error connected in RabbitMQ')
            console.log(err)
            return null
        }
    }
}