import { DataTypes, Model, Sequelize } from "sequelize";
import { TABLES } from "../constant/common";

class AddCartModel extends Model {
  quantity: any;
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
       

        productId: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        quantity:{
            type: DataTypes.NUMBER,
            allowNull: false,  
        },
        status:{
            type: DataTypes.ENUM("checkOut", "checkIn"),
            allowNull: false,
            defaultValue: "checkIn"
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
        modelName: TABLES.ADDCART,
        timestamps: false,
      }
    );
  }
}

 

export default AddCartModel;
