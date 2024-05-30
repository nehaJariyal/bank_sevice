import { Op } from "sequelize";
import database from "../models/index";

export const createUser = async (data: any) => {
  try {
    const user = database.userModel.create({
      id: data.id,
      userName: data.userName,
      email: data.email,
      fullName: data.fullName,
      address: data.address,
      gender: data.gender,
      DOB: data.DOB,
      phoneNo: data.phoneNo,
      password: data.password,
      status: data.status,
    });
    return user;
  } catch (error: any) {
    console.error("Error creating user:", error);
    return false;
  }
};

export const checkUserexistByUserNameOREmail = async (emailOrUname: string) => {
  try {
    const result = await database.userModel.findOne({
      where: {
        [Op.or]: [{ email: emailOrUname }, { userName: emailOrUname }],
        status: { [Op.in]: ["1", "2"] },
      },
    });
    return result;
  } catch (err: any) {
    console.log(
      "%%%%%%%%%%%%%%%%%%%%%%%%%%%%checkUserexistByUserNameOREmail%%%%%%%%%%%%%%%%%%%%%",
      err
    );
    return [];
  }
};

export const checkUserExistByEmail = async (email: string) => {
  try {
    const userEmail = await database.userModel.findOne({
      where: { email: email, status: { [Op.in]: ["1", "2"] } },
      attributes: [
        "id",
        "userName",
        "email",
        "fullName",
        "gender",
        "DOB",
        "address",
        "phoneNo",
        "password",
        "status",
      ],

      raw: true,
    });
    return userEmail;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Database error");
  }
};

export const getUserInfoByMail = async (email: string) => {
  try {
    const userEmail = await database.userModel.findOne({
      where: { email },
      attributes: [
        "userName",
        "email",
        "fullName",
        "gender",
        "DOB",
        "address",
        "phoneNo",
        "status",
      ],
    });
    return userEmail;
  } catch (error) {
    console.error("Error finding  by user email:", error);
    throw new Error("Database error");
  }
};

export const updateUserById = async (userId: any, userData: object) => {
  try {
    const response = await database.userModel.update(userData, {
      where: { id: userId },
    });

    console.log("Updated user with ID:", userId);
    return response;
  } catch (error: any) {
    console.error("Error updating user by ID:", error);
    return false;
  }
};

export const updateUserbyStatus = async (userId: any, userData: object) => {
  try {
    const response = await database.userModel.update(userData, {
      where: { userId },
    });

    return response;
  } catch (error: any) {
    console.log(" catch error:-   Update User by status ", error);
    return false;
  }
};

export const checkUserExistById = async (userId: any) => {
  try {
    const checkUserId = await database.userModel.findOne({
      where: { id: userId },

      raw: true,
    });
    return checkUserId;
  } catch (error) {
    console.error("Error finding user by userId:", error);
    throw new Error("Database error");
  }
};
export const getProfile = async (userId: any) => {
  try {
    const user = await database.userModel.findAll({
      where: { id: userId },

      include: [
        {
          model: database.AccountModel,
          as: "account",
          required: true,
        },
        {
          model: database.CardModel,
          as: "card",
          required: true,
        },
        {
          model: database.DepositModel,
          as: "deposit",
          required: true,
        },
        {
          model: database.WithdrawalModel,
          as: "withdrawal",
          required: true,
        },
        {
          model: database.TransactionModel,
          as: "transaction",
          required: true,
        },
        {
          model: database.ProductModel,
          as: "product",
          required: true,
        },
        {
          model: database.AddCartModel,
          as: "addToCard",
          required: true,
        },
      ],
    });
    return user;
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return null;
  }
};
