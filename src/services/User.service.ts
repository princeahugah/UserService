
import UserModel from '../models/User';
import TaskModel from '../models/Task';
import { Sequelize } from 'sequelize';

interface User {
  [key: string]: string | null;
}

export default class UserService {
  getUsers(): Promise<UserModel[]> {
    return UserModel.findAll({
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('task.id')), 'assignedTasks']
        ]
      },
      include: [
        {
          model: TaskModel,
          as: 'task',
          attributes: []
        }
      ],
      group: ['user.id'],
      order: Sequelize.literal('assignedTasks DESC'),
      raw: true
    });
  }

  getUser(id: string): Promise<UserModel> {
    return UserModel.findByPk(id, {
      raw: true
    });
  }

  createUser(payload: User): Promise<UserModel> {
    return UserModel.create(payload, { raw: true });
  }

  async deleteUser(id: string): Promise<void> {
    const user: UserModel | null = await UserModel.findByPk(id);
    if (user) return user.destroy();
  }

  async updateUser(id: string, payload: User): Promise<UserModel|null> {
    const user: UserModel | null = await UserModel.findByPk(id);
    if (user) {
      Object.keys(payload).forEach((key: any) => {
        user.set(key, payload[key]);
      });
      return user.save();
    }
    return null;
  }
}
