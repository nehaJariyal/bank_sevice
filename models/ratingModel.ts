import { DataTypes, Model, Sequelize } from "sequelize";
import { TABLES } from "../constant/common";

class RatingModel extends Model {
  
 
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          review:{
            type:DataTypes.STRING,
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
        modelName: TABLES.RATING,
        timestamps: false,
      });
  }
}

 

export default RatingModel;
