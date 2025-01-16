import { Router } from 'express';
import userController from './controllers/userController.js';
import contactController from './controllers/contactController.js';

const routes = Router();

routes.use('/users', userController);
routes.use('/contacts', contactController);


export default routes;