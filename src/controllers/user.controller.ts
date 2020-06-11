import logger from '../logger';
import { Request, Response } from 'express';
import UserModel from '../models/User';

export default {

  getUsers: (req: Request, res: Response): void => {
    req.app.get('user-service')
        .getUsers()
        .then((users: UserModel[]) => {
          req.payload = [...users];
          res.status(200).json(users).end();
        })
        .catch((err: Error) => {
          logger.error({
            requestId: req.requestId,
            message: 'An error occurred in getUsers handler',
            error: err
          });
          res.status(500).json({}).end();
        });
  },

  getUser: (req: Request, res: Response): void => {
    req.app.get('user-service')
        .getUser(req.params.id)
        .then((user: UserModel) => {
          req.payload = user;
          res.status(200).json(user).end();
        })
        .catch((err: Error) => {
          logger.error({
            requestId: req.requestId,
            message: 'An error occurred in getUser handler',
            error: err
          });
          res.status(500).json({}).end();
        });
  },

  deleteUser: (req: Request, res: Response): void => {
    req.app.get('user-service')
        .deleteUser(req.params.id)
        .then(() => {
          req.payload = {
            id: req.params.id
          };
          res.status(200).json({ id: req.params.id }).end();
        })
        .catch((err: Error) => {
          logger.error({
            requestId: req.requestId,
            message: 'An error occurred in deleteUser handler',
            error: err
          });
          res.status(500).json({}).end();
        });
  },

  updateUser: (req: Request, res: Response): void => {
    req.app.get('user-service')
        .updateUser(req.params.id, req.body)
        .then((user: UserModel | null) => {
          req.payload = user?.toJSON();
          res.status(200).json( user?.toJSON() ).end();
        })
        .catch((err: Error) => {
          logger.error({
            requestId: req.requestId,
            message: 'An error occurred in updateUser handler',
            error: err
          });
          res.status(500).json({}).end();
        });
  },

  createUser: (req: Request, res: Response): void => {
    req.app.get('user-service')
        .createUser(req.body)
        .then((user: UserModel) => {
          req.payload = {
            ...user.toJSON()
          };
          res.status(200).json( user.toJSON() ).end();
        })
        .catch((err: Error) => {
          logger.error({
            requestId: req.requestId,
            message: 'An error occurred in createUser handler',
            error: err
          });
          res.status(500).json({}).end();
        });
  }
};
