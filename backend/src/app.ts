import express from "express" ;
import { errorHandler } from "./shared/middleware/errorHandler.middleware.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import {pinoHttp} from "pino-http";
import { apiRateLimiter } from "./shared/middleware/rateLimiter.middleware.js";


const app = express() ;

app.set("trust proxy", "172.17.0.2");

app.use(helmet()) ;
app.use(pinoHttp({transport:{target: "pino-pretty"}}))
app.use(express.json()) ;
app.use(cookieParser()) ;
app.use('/api',apiRateLimiter) ;
app.use('/api/v1',router) ;




app.use(errorHandler)

export default app ;