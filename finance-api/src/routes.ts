import { Router } from "express";
import { findCandleController } from "./useCases/FindCandle";

const router = Router()

router.get('/candles/:quantity', async (req, res)=>{
    const quantity = parseInt(req.params.quantity)
    const lastCandles = await findCandleController.findLast(quantity)
    return res.json(lastCandles)
})
export {router}