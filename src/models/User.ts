import { Model, DataTypes } from 'sequelize';
import Task from './Task';
import db from '../sequelize';


class User extends Model<User> {
  public id!: string;
  public name!: string;

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
  name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize: db,
  tableName: 'users',
  timestamps: true,
  paranoid: true,
  hooks: {
    afterDestroy: async (instance, options): Promise<void> => {
      await Task.destroy({
        where: {
          userId: instance.get('id')
        }
      });
    }
  }
});


User.hasMany(Task, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'task',
  hooks: true
});

Task.belongsTo(User);

export default User;
