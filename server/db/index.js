// Run your seed script with the following command in your terminal:
// cd \RoomReady\server
// node db/index.js

import { seedSchema } from './schema-seed.js';
import { seedRooms } from './room-seeds.js';
import { seedUsers } from './user-seeds.js';
import { sequelize } from '../src/models/index.js';

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedSchema();
    console.log('\n----- SCHEMA CREATED -----\n');

    await seedRooms();
    console.log('\n----- ROOMS SEEDED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
     
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
