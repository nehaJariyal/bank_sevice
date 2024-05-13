import database from "../models/index";

export const createTransaction = async (data: any) => {
  try {
    const user = database.TransactionModel.create({
      userId: data.userId,
      otherId:data.otherId,
      amount: data.amount,
      transactionId:data.transactionId,
      accountType: data.accountType,
      transactionType:data.transactionType
    });
    return user;
  } catch (error: any) {
    console.error("Error Create Transation !:", error);
    return false;
  }
};
