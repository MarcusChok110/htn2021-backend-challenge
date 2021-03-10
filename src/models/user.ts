import db from '../db/index';
import { DataTypes } from 'sequelize';

const User = db.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  picture: { type: DataTypes.STRING },
  company: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
});

export default User;
