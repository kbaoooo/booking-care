const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sequelize', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

export default async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

