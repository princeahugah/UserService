import { Router } from 'express';
import UserController from '../controllers/user.controller';
import _404Controller from '../controllers/404.controller';

export const users = Router();

users.get('/', UserController.getUsers);
users.get('/:id', UserController.getUser);
users.post('/', UserController.createUser);
users.put('/:id', UserController.updateUser);
users.delete('/:id', UserController.deleteUser);
users.all('/*', _404Controller);
