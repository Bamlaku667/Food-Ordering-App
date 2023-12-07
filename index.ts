import express from 'express';
import bodyParser from 'body-parser'
import { AdminRoutes } from './routes/';
import { VandorRoutes } from './routes/';
import mongoose from 'mongoose';
import { dbURI } from './config';
const app = express();

app.get('/', (req, res) => {
    res.send('hello expres')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/v1/admin', AdminRoutes)
app.use('/api/v1/Vandor', VandorRoutes);

mongoose.connect(dbURI).then(() => {
    console.log('CONNECTING TO DB..')
    app.listen(3000, () => {
        console.log(`server is running on port 3000`)
    })

}).catch(err => {
    throw err;
});


