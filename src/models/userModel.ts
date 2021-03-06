import db from '../db/index';
import { DataTypes, Model } from 'sequelize';

/**
 * Attributes to be mapped to columns for user table
 */
export interface UserAttributes {
  id?: number;
  name?: string;
  picture?: string;
  company?: string;
  email?: string;
  phone?: string;
}

export interface UserInstance extends Model, UserAttributes {}

/**
 * User model for user table in database
 */
const User = db.define<UserInstance>(
  'User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    picture: { type: DataTypes.STRING },
    company: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone: { type: DataTypes.STRING },
  },
  { timestamps: false }
);

export default User;
