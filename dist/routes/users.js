"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const _404_controller_1 = __importDefault(require("../controllers/404.controller"));
exports.users = express_1.Router();
exports.users.get('/', user_controller_1.default.getUsers);
exports.users.post('/:id', user_controller_1.default.createUser);
exports.users.put('/:id', user_controller_1.default.updateUser);
exports.users.delete('/:id', user_controller_1.default.deleteUser);
exports.users.all('/*', _404_controller_1.default);
//# sourceMappingURL=users.js.map