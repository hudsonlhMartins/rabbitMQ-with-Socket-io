import { Axios } from "axios";
import config,{ IConfig } from "config";

const coingeckoUrl:IConfig = config.get('App.clients.url')

export class Coingecko {

    constructor(protected request: Axios){}


    async getDataBitcoin():Promise<number>{
        const res = await this.request.get(`${coingeckoUrl}`)
        const data = res.data.bitcoin.usd
        return data
    }
}