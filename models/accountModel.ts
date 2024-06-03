import { DataTypes, Model, Sequelize } from "sequelize";
import { TABLES } from "../constant/common";

class AccountTable extends Model {
  [x: string]: any;
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
          unique: true,
        },
        balance: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        accountType: {
          type: DataTypes.ENUM("SAVINGS", "CURRENT"),
          allowNull: false,
          defaultValue: "SAVINGS",
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
        modelName: TABLES.ACCOUNT,
        timestamps: false,
      }
    );
  }
}

export default AccountTable;
