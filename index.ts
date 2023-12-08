import express from "express";
import dbConnection from "./services/DataBase"
import App from "./services/ExpressApp"

const startServer = async () => {
    const app = express();
    await dbConnection();
    await App(app);

    app.listen(3000, () => {
        console.log('server is listening on port 3000');
    })
}

startServer();