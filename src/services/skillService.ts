import db from '../db';
import Skill, { SkillAttributes, SkillInstance } from '../models/skillModel';
import fs from 'fs';
import path from 'path';

const freqQuery = fs
  .readFileSync(path.resolve(__dirname, '../scripts/freqQuery.sql'))
  .toString();

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
  /**
   * Finds the frequency of the skills in the database >= min and <= max using
   * raw SQL
   */
  async findFrequency(min?: number, max?: number) {
    let query: string = freqQuery;

    if (min && max) {
      query = `
      SELECT * FROM (${freqQuery}) 
      WHERE frequency >= ${min} AND frequency <= ${max}
      `;
    } else if (min) {
      query = `
      SELECT * FROM (${freqQuery}) 
      WHERE frequency >= ${min}
      `;
    } else if (max) {
      query = `
      SELECT * FROM (${freqQuery}) 
      WHERE frequency <= ${max}
      `;
    }

    const [results] = await db.query(query);
    return results;
  },
};

export default skillService;
