import { MongoCandleRepository } from "../../repositories/implementations/MongoCandleRepository";
import { FindCandleController } from "./FindCandleController";
import { FindCandleUseCase } from "./FindCandleUseCase";


const mongoCandleRepository = new MongoCandleRepository()
const findCandleUseCase = new FindCandleUseCase(mongoCandleRepository)

const findCandleController = new FindCandleController(findCandleUseCase)

export {findCandleUseCase, findCandleController}