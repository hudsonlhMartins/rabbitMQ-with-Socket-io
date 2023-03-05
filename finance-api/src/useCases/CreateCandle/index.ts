import { MongoCandleRepository } from "../../repositories/implementations/MongoCandleRepository";
import { CreateCandleCrontroller } from "./CreateCandleConbtroller";
import { CreateCandleUseCase } from "./CreateCandleUseCase";


const mongoCandleRepository = new MongoCandleRepository()

const createCandleUseCase = new CreateCandleUseCase(mongoCandleRepository)


const createCandleController = new CreateCandleCrontroller(createCandleUseCase)

export{createCandleUseCase, createCandleController}