"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
exports.default = {
    getUsers: (req, res) => {
        req.app.get('user-service')
            .getUsers()
            .then((users) => {
            req.payload = [...users];
            res.status(200).json(users).end();
        })
            .catch((err) => {
            logger_1.default.error({
                requestId: req.requestId,
                message: 'An error occurred in getUsers handler',
                error: err
            });
            res.status(500).json({}).end();
        });
    },
    deleteUser: (req, res) => {
        req.app.get('user-service')
            .deleteUser(req.params.id)
            .then(() => {
            req.payload = {
                id: req.params.id
            };
            res.status(200).json({ id: req.params.idl }).end();
        })
            .catch((err) => {
            logger_1.default.error({
                requestId: req.requestId,
                message: 'An error occurred in deleteUser handler',
                error: err
            });
            res.status(500).json({}).end();
        });
    },
    updateUser: (req, res) => {
        req.app.get('user-service')
            .updateUser(req.params.id, req.body)
            .then((user) => {
            req.payload = user?.toJSON();
            res.status(200).json(user?.toJSON()).end();
        })
            .catch((err) => {
            logger_1.default.error({
                requestId: req.requestId,
                message: 'An error occurred in updateUser handler',
                error: err
            });
            res.status(500).json({}).end();
        });
    },
    createUser: (req, res) => {
        req.app.get('user-service')
            .createUser(req.body)
            .then((user) => {
            req.payload = {
                ...user.toJSON()
            };
            res.status(200).json(user.toJSON()).end();
        })
            .catch((err) => {
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