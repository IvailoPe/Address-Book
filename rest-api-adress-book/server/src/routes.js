import { Router } from 'express';
import userController from './controllers/userController.js';
import contactController from './controllers/contactController.js';
import filterController from './controllers/filterController.js';

const routes = Router();

routes.use('/users', userController);
routes.use('/contacts', contactController);
routes.use('/filter', filterController);


export default routes;