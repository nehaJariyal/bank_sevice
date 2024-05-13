import database from "../models/index";
import sequelize from "../db/sequelize";

export const createAccountDetail = async (data: any) => {
  const t = await sequelize.transaction();
  try {
    const user = await database.AccountModel.create({
      userId: data.userId,
      balance: data.balance,
      accountType: data.accountType,
    },{transaction:t},);
    return user;
  } catch (error: any) {
    console.error("Error creating user:", error);
    return false;
  }
};

export const updateBalance = async (userdata:any) => {
  try {
    const account = await database.AccountModel.increment({ balance: userdata.balance  }, { where: { userId:userdata.userId  } });
    
 return account
  } catch (error: any) {
    console.error("Error updating balance:", error);
    return false;   
  }
 };


 export const  updateAmount = async (userdata:any) => {
  try {
    const account = await database.AccountModel.decrement({ balance: userdata.balance  }, { where: { userId:userdata.userId  } });
    
 return account
  } catch (error: any) {
    console.error("Error updating balance:", error);
    return false;
  }
 };

 

