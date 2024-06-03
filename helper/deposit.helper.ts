import database from "../models/index";

const createDepositDetail = async (data: any) => {
  try {
    const user = await database.DepositModel.create({
      userId: data.userId,
      amount: data.amount,
    });
    return user;
  } catch (error: any) {
    console.error("Error creating deposit detail:", error);
    return false;
  }
};

export default {
  createDepositDetail,
};
