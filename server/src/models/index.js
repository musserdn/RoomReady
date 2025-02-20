import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { RoomFactory } from './room.js';

const User = UserFactory(sequelize);
const Room = RoomFactory(sequelize);

// Define associations
User.belongsTo(Room, { foreignKey: 'room' });
Room.hasMany(User, { foreignKey: 'room' });

export { sequelize, User, Room };