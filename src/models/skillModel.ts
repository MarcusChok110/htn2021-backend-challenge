import db from '../db/index';
import { DataTypes, Model } from 'sequelize';

export interface SkillInstance extends Model {
  id?: number;
  name?: string;
  rating?: number;
  user_id: number;
}

const Skill = db.define<SkillInstance>('Skill', {
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
