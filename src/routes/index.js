import siteRouter from "./site";

function initWebRoutes(app) {
    app.use('/', siteRouter);
}

export default initWebRoutes;