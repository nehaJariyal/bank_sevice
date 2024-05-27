import { Sequelize, Model, DataTypes } from "sequelize";
import { TABLES } from "../constant/common";
import bcrypt from "bcrypt";
import sequelize from "../db/sequelize";

class CardTable extends Model {
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
        cardholderName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },

        cardNo: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        epireDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        cardType: {
          type: DataTypes.ENUM("VISA", "Mastercards", "RuPay", "Contactless","credit"),
          allowNull: true,
          defaultValue: "VISA",
        },
        balance: {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue: 0,
        },
        limit: {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue:0
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
        modelName: TABLES.CARD,
        timestamps: false,
      }
    );
  }
}
 


export default CardTable;
