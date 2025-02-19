import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';


console.log('Database Password:', process.env.DB_PASSWORD);

const sequelize = process.env.DB_URL
    ? new Sequelize(process.env.DB_URL)
    : new Sequelize(process.env.DB_NAME || 'roomready_db', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'postgres',
        logging: console.log,
        dialectOptions: {
            decimalNumbers: true,
        },
    });

// Test the connection
sequelize.authenticate()
    .then(() => console.log('Database connection established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

export default sequelize;