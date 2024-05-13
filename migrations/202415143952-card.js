'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cardTables', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cardholderName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cardNo: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      epireDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      cardType: {
        type: Sequelize.ENUM('VISA', 'Mastercards','RuPay','Contactless',"credit"),
        allowNull: false,
        defaultValue: 'VISA',

      },
       balance: {
        type: Sequelize.BIGINT,
        allowNull: false,
        default:0

      },
      limit: {
        type: Sequelize.BIGINT,
        
        allowNull: false,
        


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
    await queryInterface.dropTable('cardTables',);
  }
};

