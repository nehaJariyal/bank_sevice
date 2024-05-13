import express, { Request, Response } from "express";
import depositHelper from "../../helper/deposit.helper";
import withdrawalHelper from "../../helper/withdrawal.helper";
import * as transactionHelper from "../../helper/transation.helper";
import * as AccountHelper from "../../helper/account.helper";
import { responceCode, withdrawalMassage } from "../../constant/common";
import { depositMassage } from "../../constant/common";
import { massage } from "../../constant/common";
import sequelize from "../../db/sequelize";
interface DepositTableAttributes {
  id: number;
  userId: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
interface WithdrawalTableAttributes {
  id: number;
  userId: number;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransactionTableAttributes {
  id: number;
  userId: number;
  otherId: number;
  transactionId: string;
  amount: number;
  transactionType: "Deposit" | "Withdrawal" | "Payment";
  createdAt?: Date;
  updatedAt?: Date;
}

export const createDeposit = async (req: Request, res: Response) => {
  const t = await sequelize.transaction(); 

  try {
    const amount = req.body.amount;
    const dataObj: DepositTableAttributes = {
      id: req.body.id,
      userId: req.body.userdata.userId,
      amount: amount,
    };

    const createuser: any = await depositHelper.createDepositDetail(dataObj);
    const userId = req.body.userdata.userId;
    const userid = createuser.id;
    console.log("::::::::::::::::::::", userid, " :::::::::::::::::::::::::");

    if (!userId) {
      t.rollback()
      return res
        .status(400)
        .json({ code: responceCode.ERROR,  massage:massage.ERROR_MASSAGE });
    }

    console.log(
      ":::::::::::::::::::::::::::::::::::::userID:::::::::::::",
      userId
    );
    const objCreateAccount = {
      userId: userId,
      balance: req.body.amount,
    };

    const account: any = await AccountHelper.updateBalance(objCreateAccount);

    await transactionHelper.createTransaction({
      userId: userId,
      otherId: userid,

      amount: amount,
      transactionType: "Deposit",
    });
    t.commit()
    return res.status(200).json({code:200 , deposit_data:createuser});
  } catch (error: any) {
    console.error("Error creating deposit:", error);
    return res
      .status(500)
      .json({
        code: responceCode.SERVER_ERROR,
        error: depositMassage.SERVER_ERROR_MASSAGE,
      });
  }
};

export const createWithdrawal = async (req: Request, res: Response) => {
  const t = await sequelize.transaction(); 

  try {
    const amount = req.body.amount;
    const dataObj: DepositTableAttributes = {
      id: req.body.id,
      userId: req.body.userdata.userId,
      amount: amount,
    };

    const createuser: any = await withdrawalHelper.createWithdrawalDetail(
      dataObj
    );
    const userId = req.body.userdata.userId;
    const userid = createuser.id;
    console.log("::::::::::::::::::::", userid, " :::::::::::::::::::::::::");

    if (!userId) {
      t.rollback()
      return res
        .status(400)
        .json({
          code: responceCode.ERROR,
          message: massage.ERROR_MASSAGE,
        });
    }

    console.log(
      ":::::::::::::::::::::::::::::::::::::userID:::::::::::::",
      userId
    );
    const objCreateAccount = {
      userId: userId,
      balance: req.body.amount,
    };

    const account: any = await AccountHelper.updateAmount(objCreateAccount);

    await transactionHelper.createTransaction({
      userId: userId,
      otherId: userid,

      amount: amount,
      transactionType: "Withdrawal",
    }); 
    t.commit()
    return res.status(200).json({ code: 200, userData: createuser });
  } catch (error: any) {
    console.error("Error creating withdrawal:", error);
    return res
      .status(500)
      .json({
        code: responceCode.SERVER_ERROR,
        error: withdrawalMassage.SERVER_ERROR_MASSAGE,
      });
  }
};
