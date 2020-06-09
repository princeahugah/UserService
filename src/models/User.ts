import { Model, DataTypes } from 'sequelize';
import Task from './Task';
import db from '../sequelize';


export default class User extends Model<User> {
  public id!: string;
  public firstName!: string;
  public lastName!: string

  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
  public readonly updatedAt!: Date;
}


User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: new DataTypes.STRING(100),
    allowNull: true
  },
  lastName: {
    type: new DataTypes.STRING(100),
    allowNull: true
  }
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: true,
  paranoid: true
});


User.hasMany(Task, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'task'
});

Task.belongsTo(User);
