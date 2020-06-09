import { Model, DataTypes } from 'sequelize';
import db from '../sequelize';


export default class Task extends Model<Task> {
  public id!: string;
  public name!: string;
  public description!: string
  public userId!: string

  public readonly createdAt!: Date;
  public readonly deletedAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: new DataTypes.STRING(255),
    allowNull: true
  },
  userId: {
    type: DataTypes.UUIDV4,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'tasks',
  timestamps: true,
  paranoid: true
});
