import { Sequelize } from 'sequelize';

// const database = new Sequelize({
//     dialect: 'mysql',
//     host: 'localhost',
//     username: 'root',
//     database:'bank_service',
//     password: 'admin123',
//     port: 3306
// });


const dialect='mysql'
const host= 'localhost'
const username= 'root'
const password= 'admin123'
const port= 3306



const sequelize = new Sequelize(`${dialect}://${username}:${password}@${host}:${port}`);

  const createDatabase = async () => {
    try {
      
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  
       
      await sequelize.query('CREATE DATABASE IF NOT EXISTS bank_service;');
      console.log('Database "bank_service" created  successfully');
  
      
      await sequelize.close();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
  createDatabase();




export default sequelize;
