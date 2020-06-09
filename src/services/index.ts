import { Application } from 'express';
import UserService from './User.service';
import logger from '../logger';

export default (app: Application): void => {
  logger.debug('Bootstrapping app services');
  app.set('user-service', new UserService());
};

