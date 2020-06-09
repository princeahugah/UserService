"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
exports.default = {
    request: (req, res, next) => {
        const headers = Object.assign({}, req.headers);
        if (req.headers.authorization) {
            headers.authorization = 'Bearer ********';
        }
        console.log('req headers =>', req.headers);
        console.log('req cookies =>', req.cookies);
        console.log('req body =>', req.body);
        logger_1.default.log({
            level: 'info',
            message: '',
            requestId: req.requestId,
            method: req.method,
            originalUrl: req.originalUrl,
            query: req.query,
            params: req.params,
            headers,
            cookies: req.cookies,
            body: req.body,
            direction: 'Inbound'
        });
        next();
    },
    error: (err, req, res, next) => {
        console.log('logging error');
        logger_1.default.log({
            level: 'error',
            message: '',
            requestId: req.requestId,
            headers: res.getHeaders(),
            error: err,
            direction: 'Outbound'
        });
    },
    response: (req, res) => {
        if (req.payload && req.payload.accessToken) {
            req.payload = Object.assign(req.payload, { accessToken: '********' });
        }
        logger_1.default.log({
            level: 'info',
            message: '',
            requestId: req.requestId,
            headers: res.getHeaders(),
            statusCode: res.statusCode,
            payload: req.payload,
            direction: 'Outbound'
        });
    }
};
//# sourceMappingURL=logger.js.map