import express from "express";
import { errorHandler } from "./shared/middleware/errorHandler.middleware.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import { pinoHttp } from "pino-http";
const app = express();
app.use(helmet());
app.use(pinoHttp({ transport: { target: "pino-pretty" } }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', router);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map