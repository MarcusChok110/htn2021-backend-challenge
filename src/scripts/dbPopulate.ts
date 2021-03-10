import db from '../db/index';
import fs from 'fs';
import User from '../models/user';
import path from 'path';
import Skill from '../models/skill';

async function dbPopulate() {
  await db.authenticate();
  await db.sync({ force: true });
  const rawData = fs.readFileSync(
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
