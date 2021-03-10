import db from '../db/index';
import { DataTypes } from 'sequelize';

const Skill = db.define('Skill', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  rating: { type: DataTypes.INTEGER },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

export default Skill;
