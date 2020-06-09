#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("config"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const logger_1 = __importDefault(require("./logger"));
const app_1 = __importDefault(require("./app"));
const createLogDirectory = () => {
    if (!fs_1.default.existsSync(config_1.default.get('log.directory'))) {
        fs_1.default.mkdirSync(config_1.default.get('log.directory'));
    }
};
const openHttpsConnection = (_app) => {
    logger_1.default.debug('ssl is enabled');
    const options = {
        key: fs_1.default.readFileSync(process.env.PRIVATE_KEY),
        cert: fs_1.default.readFileSync(process.env.PUBLIC_KEY)
    };
    https_1.default.createServer(options, _app).listen(_app.get('port'), () => {
        logger_1.default.info(`User Service Server listening on port ${_app.get('port')} with pid ${process.pid}`);
    });
};
const openHttpConnection = (_app) => {
    logger_1.default.debug('ssl is disabled');
    _app.listen(_app.get('port'), () => {
        logger_1.default.info(`User Service Server listening on port ${_app.get('port')} with pid ${process.pid}`);
    });
};
const publishApplication = () => {
    app_1.default.set('port', process.env.port);
    if (config_1.default.get('use_ssl')) {
        openHttpsConnection(app_1.default);
    }
    else {
        openHttpConnection(app_1.default);
    }
};
process.setMaxListeners(0);
createLogDirectory();
publishApplication();
//# sourceMappingURL=index.js.map