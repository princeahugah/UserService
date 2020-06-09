"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Task_1 = __importDefault(require("./Task"));
const sequelize_2 = __importDefault(require("../sequelize"));
class User extends sequelize_1.Model {
}
exports.default = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: new sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    lastName: {
        type: new sequelize_1.DataTypes.STRING(100),
        allowNull: true
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'users',
    timestamps: true,
    paranoid: true
});
User.hasMany(Task_1.default, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'task'
});
Task_1.default.belongsTo(User);
//# sourceMappingURL=User.js.map