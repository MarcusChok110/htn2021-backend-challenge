import Skill, { SkillInstance } from '../models/skillModel';

const skillService = {
  async findAll() {
    return await Skill.findAll();
  },
  async findAllFromUser(user_id: number) {
    return await Skill.findAll({ where: { user_id } });
  },
  async update(id: number, values: SkillInstance) {
    return await Skill.update(values, { where: { id } });
  },
  async updateOrCreate(user_id: number, values: SkillInstance) {
    const skill = await Skill.findOne({
      where: { user_id, name: values?.name },
    });
    if (!skill) {
      return await Skill.create({ ...values, user_id });
    }
    return await Skill.update(values, { where: { id: skill.id } });
  },
};

export default skillService;
