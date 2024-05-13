'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accountTables', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
       
      balance: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      accountType: {
        type: Sequelize.ENUM('SAVINGS', 'CURRENT'),
        allowNull: false,
        defaultValue: 'SAVINGS'
      },
      
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW

      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW

      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accountTables',);
  }
};

