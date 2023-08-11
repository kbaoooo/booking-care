import siteRouter from "./site";
import crudRouter from "./crud";
import apiRouter from "./api";

function initWebRoutes(app) {
    app.use('/api', apiRouter)
    app.use('/crud', crudRouter);
    app.use('/', siteRouter);
}

export default initWebRoutes;