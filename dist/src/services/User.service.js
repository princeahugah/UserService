"use strict";
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
                    [sequelize_1.Sequelize.fn('COUNT', sequelize_1.Sequelize.col('task.id')), 'assignedTasks']
                ]
            },
            include: [
                {
                    model: Task_1.default,
                    as: 'task',
                    attributes: []
                }
            ],
            group: ['user.id'],
            order: sequelize_1.Sequelize.literal('assignedTasks DESC'),
            raw: true
        });
    }
    createUser(payload) {
        return User_1.default.create(payload, { raw: true });
    }
    async deleteUser(id) {
        const user = await User_1.default.findByPk(id);
        if (user)
            return user.destroy();
    }
    async updateUser(id, payload) {
        const user = await User_1.default.findByPk(id, { raw: false });
        if (user) {
            return user.update(payload, {
                raw: false
            });
        }
        return null;
    }
}
exports.default = UserService;
//# sourceMappingURL=User.service.js.map