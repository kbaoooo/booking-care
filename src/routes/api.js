import { Router } from "express";
import ApiController from "../controllers/ApiController";

const apiRouter = Router();

apiRouter.post('/login', ApiController.handleLogin)

export default apiRouter;