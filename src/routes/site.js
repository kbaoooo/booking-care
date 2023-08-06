import SiteController from "../controllers/SiteController";
import { Router } from "express";

const siteRouter = Router();

siteRouter.get('/', SiteController.index)

export default siteRouter;
