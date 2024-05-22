import { Sequelize, Model, DataTypes } from "sequelize";
import { TABLES } from "../constant/common";
import bcrypt from "bcrypt";

class ProductTable extends Model {
 
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
        
        name: {
            type: DataTypes.STRING
          },
          description: {
            type: DataTypes.TEXT
          },
          price: {
            type: DataTypes.FLOAT
          },
          image:{
            type:DataTypes.STRING
          },
          category:{
            type:DataTypes.STRING
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
        modelName: TABLES.PRODUCT,
        timestamps: false,
      }
    );
  }
}


export default ProductTable;
