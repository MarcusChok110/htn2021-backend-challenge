import Skill, { SkillAttributes, SkillInstance } from '../models/skillModel';

const skillService = {
  async findAll() {
    return await Skill.findAll();
  },
  async findAllFromUser(user_id: number) {
    return await Skill.findAll({ where: { user_id } });
  },
  /**
   * Update a skill which already exists in the database
   */
  async update(id: number, values: SkillAttributes) {
    return await Skill.update(values, { where: { id } });
  },
  /**
   * Creates a skill for the given user_id if it does not exist or updates it if it
   * does exist
   */
  async save(user_id: number, values: SkillAttributes) {
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
  /**
   * Insert a skill which doesn't already exist in the database
   */
  async create(user_id: number, values: SkillAttributes) {
    return await Skill.create({ ...values, user_id });
  },
  /**
   * Deletes all skills with user_id given
   */
  async deleteByUserId(user_id: number) {
    return await Skill.destroy({ where: { user_id } });
  },
};

export default skillService;
