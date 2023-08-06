import express from 'express';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes';
import 'dotenv/config'
import bodyParser from 'body-parser';
import connectDB from './config/connectDB';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// init web routes
initWebRoutes(app)

// view engine
viewEngine(app);

// connect database
connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})