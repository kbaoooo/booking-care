import express from 'express';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes';
import 'dotenv/config'
import bodyParser from 'body-parser';
import methodOverride from 'method-override'
import connectDB from './config/connectDB';

const app = express();
const port = process.env.PORT || 8080;

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({limit: '50mb'}));

// override with POST having ?_method=
app.use(methodOverride('_method'))

// init web routes
initWebRoutes(app)

// view engine
viewEngine(app);

// connect database
connectDB();


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})