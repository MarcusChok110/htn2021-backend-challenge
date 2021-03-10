import Skill, { SkillAttributes, SkillInstance } from '../models/skillModel';

const skillService = {
  async findAll() {
    return await Skill.findAll();
  },
  async findAllFromUser(user_id: number) {
    return await Skill.findAll({ where: { user_id } });
  },
  async update(id: number, values: SkillAttributes) {
    return await Skill.update(values, { where: { id } });
  },
  async updateOrCreate(user_id: number, values: SkillAttributes) {
    const skill = await Skill.findOne({
      where: { user_id, name: values?.name },
    });
    if (!skill) {
      return await Skill.create({ ...values, user_id });
    }
    return await Skill.update(values, { where: { id: skill.id } });
  },
  extractSkills(skills: SkillInstance[]) {
    return skills.map((skill) => skill.get());
  },
};

export default skillService;
