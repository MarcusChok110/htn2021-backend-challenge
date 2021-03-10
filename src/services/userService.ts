import User, { UserAttributes } from '../models/userModel';

const userService = {
  async findAll() {
    return await User.findAll();
  },
  async findOne(id: number) {
    return await User.findOne({ where: { id } });
  },
  async update(id: number, values: UserAttributes) {
    return await User.update(values, { where: { id } });
  },
  async create(values: UserAttributes) {
    return await User.create(values);
  },
  async delete(id: number) {
    const user = await User.findOne({ where: { id } });
    return await user?.destroy();
  },
};

export default userService;
