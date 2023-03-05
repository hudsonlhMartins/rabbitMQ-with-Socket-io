import axios from "axios";
import config from 'config'
import { Coingecko } from "./client/Coingecko";
import { MessageChanel } from "./message/messageChanel";
import { Candle } from "./models/Candle";
import { GeneratorCandle } from "./useCase/GeneratorCandle/GeneratorCandle";

//config.get('App.port')
const coingecko = new Coingecko(axios)
const candle = new Candle('BTC')
const message = MessageChanel
const generateCandle = new GeneratorCandle(coingecko, candle)

generateCandle.execute()
