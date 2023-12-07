import express, { NextFunction, Request, Response, request } from 'express';
import { Createvandor, GetvandorById, Getvandors } from '../controllers';

const router = express.Router();

router.route('/').get(Getvandors).post(Createvandor);
router.route('/:id').get(GetvandorById);


export { router as AdminRoutes }