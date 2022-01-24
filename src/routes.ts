import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import AutoController from './controllers/autoController';

import BrandController from './controllers/brandController';
import UserController from './controllers/userController';

const route = express.Router();

route.get('/profile/:id',UserController.index);
route.post('/register',UserController.create);
route.post('/login',UserController.login);
route.put('/update/user',UserController.update);
route.delete('/delete/:id',UserController.delete);

route.get('/automobiles',AutoController.index);
route.post('/automobile',multer(multerConfig).single('photo'),AutoController.create);
route.put('/update/automobile',AutoController.update);

route.get('/automotivebrands/', BrandController.index);
route.post('/create/automotivebrand',BrandController.create);
route.put('/update/automotivebrand',BrandController.update);
route.delete('/delete/automotivebrand/:id',BrandController.delete);


export default route;