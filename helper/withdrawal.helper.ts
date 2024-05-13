

import database from "../models/index";

const createWithdrawalDetail = async (data: any) => {
  try {
    const user = await database.WithdrawalModel.create({
      userId: data.userId,
      amount: data.amount,
    });
    return user;
  } catch (error: any) {
    console.error("Error withdrawal detail:", error);
    return false;
  }
};



 

export default {
  createWithdrawalDetail,
};
