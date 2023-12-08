import express, { Application } from 'express';
import bodyParser from 'body-parser'
import { AdminRoutes } from '../routes/';
import { VandorRoutes } from '../routes/';
import path from 'path'
export default async (app: Application) => {
    app.get('/', (req, res) => {
        res.send('hello expres')
    })

    app.use('/images', express.static(path.join(__dirname, 'images')))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/api/v1/admin', AdminRoutes)
    app.use('/api/v1/Vandor', VandorRoutes);

    return app
}





