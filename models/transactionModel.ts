import { Sequelize, Model, DataTypes } from "sequelize";
import { TABLES } from "../constant/common";
import bcrypt from "bcrypt";

class TransactionModel extends Model {
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.ENUM('Deposit', 'Withdrawal', 'Payment'),
      allowNull: false,
      defaultValue: 'Payment',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
},
{
  sequelize,
  modelName: TABLES.TRANSATION,
  timestamps: false,
}
);
}
}

export default TransactionModel;
