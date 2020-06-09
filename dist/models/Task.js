"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
const sequelize_2 = __importDefault(require("../sequelize"));
class Task extends sequelize_1.Model {
}
exports.default = Task;
Task.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: new sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    userId: {
        type: sequelize_1.DataTypes.UUIDV4,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'tasks',
    timestamps: true,
    paranoid: true
});
Task.belongsTo(User_1.default, { targetKey: 'id' });
//# sourceMappingURL=Task.js.map