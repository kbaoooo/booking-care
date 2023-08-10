import siteRouter from "./site";
import crudRouter from "./crud";

function initWebRoutes(app) {
    app.use('/crud', crudRouter);
    app.use('/', siteRouter);
}

export default initWebRoutes;