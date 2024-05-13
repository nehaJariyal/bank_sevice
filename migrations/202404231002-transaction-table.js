"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transactionTables", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      otherId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      transactionId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      transactionType: {
        type: Sequelize.ENUM('Deposit', 'Withdrawal','Payment' ),
        allowNull: false,
        defaultValue: 'Payment',
      },
      
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("transactionTables");
  },
};
