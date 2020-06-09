"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
exports.default = {
    getUsers: (req, res) => {
        console.log('get users route called');
        req.app.get('user-service')
            .getUsers()
            .then((users) => {
            console.log('users', users);
            req.payload = {
                users
            };
            res.status(200).json({ users }).end();
        })
            .catch((err) => {
            console.log('exception in getUsers controller', err);
            logger_1.default.error({
                requestId: req.requestId,
                message: 'An error occurred in getUsers handler',
                error: err
            });
            res.status(500).json({}).end();
        });
    },
    deleteUser: (req, res) => {
        console.log('delete user route called', req.params);
        req.app.get('user-service')
            .deleteUser(req.params.id)
            .then(() => {
            console.log('deleted user ');
            req.payload = {
                id: req.params.id
            };
            res.status(200).json({ id: req.params.idl }).end();
        })
            .catch((err) => {
            console.log('exception in deleteUser controller', err);
            logger_1.default.error({
                requestId: req.requestId,
                message: 'An error occurred in deleteUser handler',
                error: err
            });
            res.status(500).json({}).end();
        });
    },
    updateUser: (req, res) => {
        console.log('update user route called', req.params);
        req.app.get('user-service')
            .updateUser(req.params.id, req.body)
            .then(() => {
            console.log('deleted user ');
            req.payload = {
                id: req.params.id
            };
            res.status(200).json({ id: req.params.idl }).end();
        })
            .catch((err) => {
            console.log('exception in updateUser controller', err);
            logger_1.default.error({
                requestId: req.requestId,
                message: 'An error occurred in updateUser handler',
                error: err
            });
            res.status(500).json({}).end();
        });
    },
    createUser: (req, res) => {
        console.log('create user route called', req.params);
        req.app.get('user-service')
            .createUser(req.params.id, req.body)
            .then(() => {
            console.log('created user ');
            req.payload = {
                id: req.params.id
            };
            res.status(200).json({ id: req.params.idl }).end();
        })
            .catch((err) => {
            console.log('exception in createUser controller', err);
            logger_1.default.error({
                requestId: req.requestId,
                message: 'An error occurred in createUser handler',
                error: err
            });
            res.status(500).json({}).end();
        });
    }
};
//# sourceMappingURL=user.controller.js.map