import { Sequelize, Model, DataTypes } from "sequelize";
import { TABLES } from "../constant/common";
import bcrypt from "bcrypt";

class DepositModel extends Model {
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },

        amount: {
          type: DataTypes.BIGINT,
          allowNull: false,
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
        modelName: TABLES.DIPOSIT,
        timestamps: false,
      }
    );
  }
}

export default DepositModel;
