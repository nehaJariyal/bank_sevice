import { Sequelize, Model, DataTypes } from "sequelize";
import { TABLES } from "../constant/common";

class WithdrawalModel extends Model {
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
        modelName: TABLES.WITHDRAWAL,
        timestamps: false,
      }
    );
  }
}


export default WithdrawalModel;
