import db from '../db/index';
import { DataTypes, Model } from 'sequelize';

export interface UserInstance extends Model {
  id?: number;
  name?: string;
  picture?: string;
  company?: string;
  email?: string;
  phone?: string;
}

const User = db.define<UserInstance>('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  picture: { type: DataTypes.STRING },
  company: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
});

export default User;
