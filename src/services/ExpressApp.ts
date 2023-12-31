import express, { Application } from 'express';
import { AdminRoutes, CustomerRoutes } from '../routes/';
import { VandorRoutes } from '../routes/';
import { ShopingRoutes } from '../routes/ShopingRoutes';
import path from 'path'
export default async (app: Application) => {
    app.get('/', (req, res) => {
        res.send('hello expres')
    })

    app.use('/images', express.static(path.join(__dirname, 'images')))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/api/v1/admin', AdminRoutes)
    app.use('/api/v1/Vandor', VandorRoutes);
    app.use('/api/v1/', ShopingRoutes);
    app.use('/api/v1/customer', CustomerRoutes)
    return app
}





