"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const response_time_1 = __importDefault(require("response-time"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./logger"));
const logger_2 = __importDefault(require("../logger"));
const log_id_generator_1 = __importDefault(require("../utils/log-id-generator"));
const corsOptions = {
    allowedHeaders: JSON.parse(process.env.CORS_ALLOWED_HEADERS),
    exposedHeaders: JSON.parse(process.env.CORS_EXPOSED_HEADERS),
    methods: JSON.parse(process.env.CORS_METHODS),
    credentials: true,
    origin(origin, callback) {
        const whitelist = JSON.parse(process.env.CORS_ORIGIN_WHITELIST);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Route is not allowed by CORS: ' + origin));
        }
    }
};
exports.default = (app) => {
    logger_2.default.debug('Setting up middlewares');
    app.use((req, res, next) => {
        req.requestId = log_id_generator_1.default.getId();
        res.on('finish', () => {
            logger_1.default.response(req, res);
        });
        next();
    });
    app.use(cookie_parser_1.default(process.env.AUTH_SECRET));
    app.use(express_1.default.json({ limit: config_1.default.get('request_body.limit') }));
    app.use(express_1.default.urlencoded({ limit: config_1.default.get('request_body.limit'), extended: config_1.default.get('request_body.extended') }));
    app.use(logger_1.default.request);
    app.use(helmet_1.default());
    app.use(response_time_1.default({ digits: 3 }));
    app.use(cors_1.default(corsOptions));
    app.use(cors_1.default((req, callback) => {
        const whitelist = JSON.parse(process.env.CORS_ORIGIN_WHITELIST);
        if (whitelist.indexOf(req.header('Origin')) !== -1) {
            // reflect (enable) the requested origin in the CORS response
            corsOptions.origin = true;
        }
        else {
            corsOptions.origin = false; // disable CORS for this request
        }
        // callback expects two parameters: error and options
        callback(null, corsOptions);
    }));
};
//# sourceMappingURL=index.js.map