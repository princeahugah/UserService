"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_service_1 = __importDefault(require("./User.service"));
const logger_1 = __importDefault(require("../logger"));
exports.default = (app) => {
    logger_1.default.debug('Bootstrapping app services');
    app.set('user-service', new User_service_1.default());
};
//# sourceMappingURL=index.js.map