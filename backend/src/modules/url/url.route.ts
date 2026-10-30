import {Router} from "express"
import { createUrlController, deleteUrlController, getUrlController } from "./url.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { validationMiddleware } from "../../shared/middleware/validation.middleware.js";
import { urlSchema } from "./url.schema.js";

const urlRouter = Router() ;

urlRouter.post('/create_url',validationMiddleware(urlSchema),authMiddleware,createUrlController) ;
urlRouter.get('/:alias',authMiddleware,getUrlController) ;
urlRouter.delete('/:alias',authMiddleware,deleteUrlController) ;


export default urlRouter ;