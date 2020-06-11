import dotenv from 'dotenv';
dotenv.config();
import UserModel from '../src/models/User';
import UserService from '../src/services/User.service';
import { expect } from 'chai';

process.env.NODE_ENV = 'test';

describe('User Service', () => {
  const user = new UserService();

  before(async () => {
    await UserModel.destroy({ truncate: true, cascade: false });
  });

  it('should return an empty list of users', async () => {
    const result = await user.getUsers();
    expect(result.length).to.equal(0);
  });

  it('should create 3 different users', async () => {
    const users = [
      {
        name: 'John Doe'
      },
      {
        name: 'Azumah Nelson'
      },
      {
        name: 'Maria Woodworth-Etter'
      }
    ];
    await user.createUser(users[0]);
    await user.createUser(users[1]);
    await user.createUser(users[2]);

    const result = await user.getUsers();
    expect(result.length).to.equal(3);
  });

  it('should get 1 user', async () => {
    const albert = {
      name: 'Albert Einstein'
    };

    const createdAlbert = await user.createUser(albert);
    const result = await user.getUser(createdAlbert.id);
    expect(result.id).to.equal(createdAlbert.id);
    expect(result.name).to.equal(createdAlbert.name);
  });

  it('should update "Azumah Nelson" to "Bunny Studio"', async () => {
    const users = await user.getUsers();
    const azumah = users.find((u: UserModel) => u.name === 'Azumah Nelson');

    expect(azumah).to.not.equal(undefined);
    if (azumah) {
      const result = await user.updateUser(azumah?.id, { name: 'Bunny Studio' });
      expect(result?.name).to.equal('Bunny Studio');
    }
  });

  it('should delete "John Doe" user', async () => {
    const users = await user.getUsers();
    const john = users.find((u: UserModel) => u.name === 'John Doe');

    expect(john).to.not.equal(undefined);
    if (john) {
      await user.deleteUser(john?.id);
      const result = await user.getUsers();
      expect(result.length).to.equal(users.length - 1);
    }
  });
});
