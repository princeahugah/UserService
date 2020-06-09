"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Task_1 = __importDefault(require("../models/Task"));
const sequelize_1 = require("sequelize");
class UserService {
    getUsers() {
        return User_1.default.findAll({
            attributes: {
                include: [
                    [sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.col('task.userId')), 'assignedTasks']
                ]
            },
            include: [
                {
                    model: Task_1.default,
                    as: 'task'
                }
            ],
            group: ['task.userId'],
            order: sequelize_1.Sequelize.literal('assignedTasks DESC'),
            raw: true
        });
    }
    createUser(payload) {
        return User_1.default.create(payload);
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByPk(id);
            if (user)
                return user.destroy();
        });
    }
    updateUser(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findByPk(id);
            if (user)
                return user.update(payload);
            return null;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=User.service.js.map