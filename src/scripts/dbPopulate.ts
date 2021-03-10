import fs from 'fs';
import path from 'path';
import db from '../db/index';
import Skill from '../models/skillModel';
import User from '../models/userModel';

/**
 * Populates the sqlite database using the provided json file
 */
async function dbPopulate() {
  // reset tables
  await db.authenticate();
  await db.sync({ force: true });

  const rawData = fs.readFileSync(
    // to use relative path instead of default
    path.resolve(__dirname, '../../data/hacker-data-2021.json')
  );
  const users = JSON.parse(rawData.toString());

  for (const user of users) {
    const { company, email, name, phone, picture, skills } = user;
    const savedUser = await User.create({
      company,
      email,
      name,
      phone,
      picture,
    });
    for (const skill of skills) {
      Skill.create({ ...skill, user_id: savedUser.getDataValue('id') });
    }
  }
}

dbPopulate();
