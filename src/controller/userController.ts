import express, { Request, Response } from "express";
import * as UserHelper from "../../helper/response.helper";
import generateToken from "../../helper/jwtToken.helper";
import * as CardHelper from "../../helper/card.helper";
import * as AccountHelper from "../../helper/account.helper";
import bcrypt from "bcrypt";
import { userStatus } from "../../constant/common";
import { getProfile } from "../../helper/response.helper";
import sequelize from "../../db/sequelize";
interface BankUserAttributes {
  id: number;
  userName: string;
  email: string;
  fullName: string;
  gender: string;
  DOB: string;
  address: string;
  phoneNo: number;
  password: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
interface CardTableAttributes {
  userId: number;
  cardholderName: string;
  epireDate: Date;
  cardNo: number;
  cardType: String;
  balance: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// interface accountTableAttributes {
//   userId: number;
//   balance: number;
//   accountType: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }
 

const createUser = async (req: Request, res: Response) => {
  const t =  sequelize.transaction(); 
  try {
    const { userName, email } = req.body;
    const dataObj: BankUserAttributes = {
      id: req.body.id,
      userName: req.body.userName,
      email: req.body.email,
      fullName: req.body.fullName,
      address: req.body.address,
      gender: req.body.gender,
      DOB: req.body.DOB,
      phoneNo: req.body.phoneNo,
      password: req.body.password,
      status: req.body.status,
    };
    const isEmailExisting = await UserHelper.checkUserexistByUserNameOREmail(
      email
    );
    console.log("Email already exist", isEmailExisting);
    if (isEmailExisting) {
      return res
        .status(400)
        .json({ code: 400, message: "Email already exists" });
    }
    const isUserExisting = await UserHelper.checkUserexistByUserNameOREmail(
      userName
    );
    if (isUserExisting) {
      return res
        .status(400)
        .json({ code: 400, message: "Username already exists" });
    }
    const createuser: any = await UserHelper.createUser(dataObj);
    const userid = createuser.dataValues.id;
    if (!userid) {
      return res.status(400).json({ code: 400, message: "UserId not found" });
    }
    const objCreateAccount = {
      userId: userid,
      balance: 0,
      accountType: req.body.accountType,
    };



    
    const createuserAccount = await AccountHelper.createAccountDetail(
      objCreateAccount
    );
 
    console.log(
      "::::::::::::::",
      createuserAccount,
      ":::::::::::::::::::::::::::::::::::::::;;;;createuserAccount",
      createuser.dataValues.id
    );

    console.log("::::::::::::::::::::::::::::dataobj", createuser);
    if (createuser) {
      (await t).commit()
      return res.status(200).json({ code: 200, userData: dataObj });
    } else {
      (await t).rollback()
      return res
        .status(400)
        .json({ code: 400, message: "Could not create user" });
    }
  } catch (error: any) {
    console.error("Error creating user:", error);
    res.status(500).json({ code: 500, message: "Could not create user" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: any = await UserHelper.checkUserExistByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "user email and password is  not found" });
    }
    const status = user.status;
    if (status === userStatus.BLOCKED) {
      return res.status(401).json({
        code: 401,
        message: "User is blocked please contact the admin",
      });
    }
    console.log(
      ":::::::::::::::::::user Data:::::::::::::::::::::::::::::",
      user
    );
    if (!user) {
      return res
        .status(404)
        .json({ code: 404, message: "Invalid email or password" });
    }

    if (!user.password) {
      return res
        .status(401)
        .json({ code: 401, message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ code: 401, message: "Invalid email or password" });
    }
    delete user.password;
    const token = generateToken({ email: user.email, id: user.id });
    console.log("token", token);

    return res
      .status(200)
      .json({ code: 200, message: "Login successful", data: { user, token } });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error" });
  }
};

export const getUserByMail = async (req: any, res: Response) => {
  const userEmail: any = req.query.email;
  try {
    const getByEmail = await UserHelper.getUserInfoByMail(userEmail);
    if (getByEmail) {
      return res
        .status(200)
        .json({ code: 200, massage: "User get successfuly", data: getByEmail });
    } else {
      return res.status(404).json({ code: 404, message: "User not found" });
    }
  } catch (error) {
    console.error("Error finding user by email:", error);
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error" });
  }
};

const updateUserById = async (req: any, res: Response) => {
  const t =  sequelize.transaction(); 

  try {
    
    const userId: any = req.body.userdata.userId;
console.log(":::::::::::::userid::::::::::::::::::::::" ,userId);

    if (!userId) {
      return res
        .status(400)
        .json({ code: 400, message: "User ID is required" });
    }

    const userData: any = req.body;
    console.log("userData", userData);
    
    const updateUser = await UserHelper.updateUserById(userId, userData);

    if (updateUser) {
      (await t).commit
      return res.status(200).json({
        code: 200,
        message: "User updated successfully",
        data: updateUser,
      });
    } else {
      (await t).rollback
      return res
        .status(404)
        .json({ code: 404, message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user by id:", error);
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error" });
  }
};

const deleteuserByStatus = async (req: Request, res: Response) => {
  const t = await sequelize.transaction(); 

  try {
    const userId = req.body.userId;

    const user: any = await UserHelper.checkUserExistById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ code: 404, message: "User not found" });
    }

    const status = user.status;

    console.log("::::::::::::::::::::status::::::::::::::::::::", status);

    const updateUser = await UserHelper.updateUserById(userId, {
      status: userStatus.DELETED,
    });

    if (updateUser) {
      t.commit()
      return res.status(200).json({
        code: 200,
        message: "User  Deleted Successfully",
        data: updateUser,
      });
    } else {
      t.rollback()
      return res
        .status(500)
        .json({ code: 500, message: "Failed to update user" });
    }
  } catch (error) {
    console.error("Error  Delete User:", error);
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error" });
  }
};

const blockeduserByStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    const user: any = await UserHelper.checkUserExistById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ code: 404, message: "User not found" });
    }

    const status = user.status;

    console.log("::::::::::::::::::::status::::::::::::::::::::", status);

    const updateUser = await UserHelper.updateUserById(userId, {
      status: userStatus.BLOCKED,
    });

    if (updateUser) {
      return res.status(200).json({
        code: 200,
        message: "User  Block Successfully",
        data: updateUser,
      });
    } else {
      return res
        .status(500)
        .json({ code: 500, message: "Failed to Block user" });
    }
  } catch (error) {
    console.error("Error Block User:", error);
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error" });
  }
};

// create  cardController

const createAtmCard = async (req: Request, res: Response) => {
  const t = await sequelize.transaction(); 

  try {
    const dataObj: CardTableAttributes = {
      userId: req.body.userdata.userId,
      cardholderName: req.body.cardholderName,
      epireDate: req.body.epireDate,
      cardNo: req.body.cardNo,
      cardType: req.body.cardType,
      balance: req.body.balance,
    };
    const userId = req.body.userdata.userId;
    const cardType: any = req.body.cardType;
    const isCardTypeExisting = await CardHelper.checkCardTypeIsExisting(
      cardType,
      userId
    );

    if (isCardTypeExisting) {
      console.log(
        "Please Change cardType, cardType is Already Exists",
        isCardTypeExisting
      );
      return res.status(400).json({
        code: 400,
        message: "Please Change cardType, cardType is Already Exists",
      });
    }
    const createUserCard = await CardHelper.createAtmCard(dataObj);
    if (createUserCard) {
      t.commit()
      return res.status(201).json({ code: 201, cardData: dataObj });
    } else {
      t.rollback()
      return res
        .status(400)
        .json({ code: 400, message: "Could not create ATM card service!" });
    }
  } catch (error: any) {
    console.error("Could not create ATM card:", error);
    res.status(500).json({
      code: 500,
      message: "Catch error: Could not create ATM card service",
    });
  }
};

export const deleteCardById = async (req: any, res: Response) => {
  const t = await sequelize.transaction(); 

  const cardId: any = req.query.id;
  const userId = req.body.userdata.userId;
  console.log(":::::::::::userid:::::::", userId);
  try {
    const isCardIdOrUserIdExisting = await CardHelper.checkCardIdIsExisting(
      cardId,
      userId
    );
    if (!isCardIdOrUserIdExisting) {
      console.log("cardId and userId do not match");
      return res
        .status(400)
        .json({ code: 400, message: "cardId and userId do not match" });
    }
    const deleteById = await CardHelper.deleteCard(cardId);
    console.log("Delete response:", deleteById);
    if (deleteById) {
      t.commit()
      return res.status(200).json({
        code: 200,
        message: "card deleted successfully",
        data: deleteById,
      });
    } else {
      t.rollback()
      return res.status(404).json({ code: 404, message: "card not found" });
    }
  } catch (error) {
    console.error("Error deleting card by ID:", error);
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error: ", error });
  }
};

const updateCardById = async (req: any, res: Response) => {
  const t = await sequelize.transaction(); 

  const userId = req.body.userdata.userId;
  const cardId: any = req.query.id;
  const cardData: any = req.body;
  console.log("data", cardId);

  try {
    const isCardIdOrUserIdExisting = await CardHelper.checkCardIdIsExisting(
      cardId,
      userId
    );
    if (!isCardIdOrUserIdExisting) {
      console.log("cardId and userId do not match");
      return res
        .status(400)
        .json({ code: 400, message: "cardId and userId do not match" });
    }
    const updatecard = await CardHelper.updateCardById(cardId, cardData);
    console.log("::::::::::::::::::::::::", updatecard);
    if (!cardId) {
      return res
        .status(400)
        .json({ code: 400, message: "card ID is required" });
    }
    if (updatecard) {
      t.commit()
      return res.status(200).json({
        code: 200,
        massage: "card update successfuly",
        data: updatecard,
      });
    } else {
      t.rollback()
      return res
        .status(404)
        .json({ code: 404, message: "card not found !!!!!" });
    }
  } catch (error) {
    console.error("Error update card by id:", error);
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error !" });
  }
};

const getCardByIdOruserId = async (req: any, res: Response) => {
  try {
    const cardId: any = req.query.id;
    const userId = req.body.userdata.userId;

    const card = await CardHelper.getCardByIdOruserId(cardId, userId);

    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }

    return res.status(200).json({ card });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



// get allusers



const getAllProfile= async (req: any, res: Response) => {


  
  const userId= req.body.userdata.userId
  console.log("userId::::::::::",userId);
  

  try {
    const user = await getProfile(userId);

    console.log("user:::::::::::::::::::::::::::::::::::::::" ,user);
    if (!user) {
      
      return res.status(404).json({ error: "!!User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return res.status(500).json({ error: "Failed to retrieve user profile" });
  }
};




export default {
  // createuser
  createUser,
  userLogin,
  getUserByMail,
  updateUserById,
  deleteuserByStatus,
  blockeduserByStatus,

  //createcard
  createAtmCard,
  updateCardById,
  deleteCardById,
  getCardByIdOruserId,

  // 
getAllProfile,
};
