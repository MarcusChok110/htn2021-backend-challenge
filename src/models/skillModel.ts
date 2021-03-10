import db from '../db/index';
import { DataTypes, Model } from 'sequelize';

export interface SkillAttributes {
  id?: number;
  name?: string;
  rating?: number;
  user_id?: number;
}

export interface SkillInstance extends Model, SkillAttributes {}

const Skill = db.define<SkillInstance>(
  'Skill',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    rating: { type: DataTypes.INTEGER },
    user_id: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  { timestamps: false }
);

export default Skill;
