import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { RoomFactory } from './room.js';

const User = UserFactory(sequelize);
const Room = RoomFactory(sequelize);

// Define associations
User.belongsTo(Room, { foreignKey: 'room_id' });
Room.hasMany(User, { foreignKey: 'room_id' });

export { sequelize, User, Room };