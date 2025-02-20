import { readFile } from 'fs/promises';
import { sequelize } from '../src/models/index.js';

export const seedSchema = async () => {
  try {
    const schemaSQL = await readFile(new URL('./schema.sql', import.meta.url), 'utf8');
    await sequelize.query(schemaSQL);
    } catch (error) {
    console.error('Error creating schema:', error);
  }
};