
import mongoose from 'mongoose';
import { dbURI } from '../config';

export default async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('connecting to db ...')
    } catch (error) {
        console.log(error)
        throw new Error('error connecting d')
    }
}





