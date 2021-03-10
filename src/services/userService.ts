import User, { UserInstance } from '../models/userModel';

const userService = {
  async findAll() {
    return await User.findAll();
  },
  async findOne(id: number) {
    return await User.findOne({ where: { id } });
  },
  async update(id: number, values: UserInstance) {
    return await User.update(values, { where: { id } });
  },
};

export default userService;
