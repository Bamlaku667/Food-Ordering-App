import express from "express";
import dbConnection from "./services/DataBase"
import App from "./services/ExpressApp"
import {PORT} from './config'
const startServer = async () => {
    const app = express();
    await dbConnection();
    await App(app);

    app.listen(PORT, () => {
        console.log(`server is listening on port ${PORT}`);
    })
}

startServer();