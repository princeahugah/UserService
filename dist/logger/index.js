"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const winston_1 = require("winston");
const { combine, timestamp, printf, colorize } = winston_1.format;
const logFormat = printf((log) => {
    // console.log('log values', log);
    // eslint-disable-next-line max-len
    const part = `[${log.timestamp}] [${log.level}] [${log.correlationId}]`;
    if (log.direction === 'Inbound') {
        return `${part} - Inbound Message
  ---------------------------------------------
  ID: ${log.requestId}
  Method: ${log.method}
  Path: ${log.originalUrl}
  Query String: ${JSON.stringify(log.query)}
  Params: ${JSON.stringify(log.params)}
  Headers: ${JSON.stringify(log.headers)}
  Cookies: ${JSON.stringify(log.cookies)}
  Payload: ${JSON.stringify(log.body)}
  -------------------------------------`;
    }
    if (log.error) {
        return `${part} - ${log.message ? log.message : 'An error occurred'}
  ---------------------------------------------
  ID: ${log.requestId}
  Headers: ${JSON.stringify(log.headers)}
  Exception: ${log.error.stack}
  -------------------------------------`;
    }
    if (log.direction === 'Outbound') {
        return `${part} - Outbound Message
  ---------------------------------------------
  ID: ${log.requestId}
  Headers: ${JSON.stringify(log.headers)}
  HTTP Status: ${log.statusCode}
  Payload: ${JSON.stringify(log.payload)}
  -------------------------------------`;
    }
    return `[${log.timestamp}] [${log.level}] ${log.message}`;
});
exports.default = winston_1.createLogger({
    format: combine(timestamp(), colorize(), logFormat),
    transports: [
        new winston_daily_rotate_file_1.default({
            filename: config_1.default.get('log.filename') || 'file.log',
            dirname: config_1.default.get('log.directory'),
            level: config_1.default.get('log.level'),
            datePattern: config_1.default.get('log.datePattern'),
            zippedArchive: true,
            handleExceptions: true
        })
    ],
    exitOnError: false
});
//# sourceMappingURL=index.js.map