import bcrypt from "bcrypt";
import { DataTypes, Model, Sequelize } from "sequelize";
import { TABLES } from "../constant/common";

class BankUser extends Model {
  public static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userName: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: { len: [3, 9] },
          unique: true,
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
        },
        fullName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        DOB: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        phoneNo: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },

        status: {
          type: DataTypes.ENUM("1", "2", "3"),
          allowNull: true,
          defaultValue: "1",
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
        modelName: TABLES.USERS,
        timestamps: false,
        hooks: {
          beforeValidate: (user: any, options) => {
            if (user.changed("password")) {
              const salt = bcrypt.genSaltSync();
              const hashedPassword = bcrypt.hashSync(user.password, salt);
              user.password = hashedPassword;
            }
          },
          beforeUpdate: (user: any, options) => {
            if (user.changed("password")) {
              const salt = bcrypt.genSaltSync();
              const hashedPassword = bcrypt.hashSync(user.password, salt);
              user.password = hashedPassword;
            }
          },
        },
      }
    );
  }
}

export default BankUser;
