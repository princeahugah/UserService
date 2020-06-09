"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const express_1 = __importDefault(require("express"));
const services_1 = __importDefault(require("./services"));
const middlewares_1 = __importDefault(require("./middlewares"));
const logger_1 = __importDefault(require("./logger"));
const logger_2 = __importDefault(require("./middlewares/logger"));
const _404_controller_1 = __importDefault(require("./controllers/404.controller"));
const users_1 = require("./routes/users");
const app = express_1.default();
const setupConfig = () => {
    logger_1.default.debug('Setting up app config');
    app.disable('x-powered-by');
    app.set('env', process.env.NODE_ENV);
    app.set('config', config_1.default);
};
const setupRoutes = () => {
    logger_1.default.debug('Initializing Routes');
    app.use('/api/users', users_1.users);
    app.use('/*', _404_controller_1.default);
    app.use(logger_2.default.error);
};
setupConfig();
services_1.default(app);
middlewares_1.default(app);
setupRoutes();
exports.default = app;
//# sourceMappingURL=app.js.map