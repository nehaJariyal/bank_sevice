import express, { Request, Response } from "express";
import depositHelper from "../../helper/deposit.helper";
import withdrawalHelper from "../../helper/withdrawal.helper";
import * as transactionHelper from "../../helper/transation.helper";
import * as AccountHelper from "../../helper/account.helper";
import { responceCode, withdrawalMassage } from "../../constant/common";
import { depositMassage } from "../../constant/common";
import { massage } from "../../constant/common";
import * as productHelper from "../../helper/product.helper";
import * as AddTocartHelper from "../../helper/addCart.helper";
import sequelize from "../../db/sequelize";
import * as ratingHelper from "../../helper/rating.helper";

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

interface ProductTableAttributes {
  userId: number;
  productName: string;
  description: Text;
  price: number;
  image: string;
  category: string;
}

interface AddTocardTableAttributes {
  userId: number;
  productId: number;
  quantity: number;
  status: string;
}

interface RatingTableAttributes {
  userId: number;
  productId: number;
  rating: number;
  review: string;
}

// transation
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
      t.rollback();
      return res
        .status(400)
        .json({ code: responceCode.ERROR, massage: massage.ERROR_MASSAGE });
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
    t.commit();
    return res.status(200).json({ code: 200, deposit_data: createuser });
  } catch (error: any) {
    console.error("Error creating deposit:", error);
    return res.status(500).json({
      code: responceCode.SERVER_ERROR,
      error: depositMassage.SERVER_ERROR_MASSAGE,
    });
  }
};

export const createWithdrawal = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();

  try {
    const amount = req.body.amount;
    const dataObj: WithdrawalTableAttributes = {
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
      t.rollback();
      return res.status(400).json({
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
    t.commit();
    return res.status(200).json({ code: 200, userData: createuser });
  } catch (error: any) {
    console.error("Error creating withdrawal:", error);
    return res.status(500).json({
      code: responceCode.SERVER_ERROR,
      error: withdrawalMassage.SERVER_ERROR_MASSAGE,
    });
  }
};

// product controller

export const addProduct = async (req: Request, res: Response) => {
  try {
    const dataObj: ProductTableAttributes = {
      userId: req.body.userdata.userId,
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      category: req.body.category,
    };
    console.log(dataObj);
    const createuser: any = await productHelper.createProduct(dataObj);
    return res.status(200).json({ code: 200, userData: dataObj });
  } catch (error) {
    console.log("Error add  Product data", error);
    return false;
  }
};

export const updateProductbyId = async (req: any, res: Response) => {
  const userId = req.body.userdata.userId;
  const productId = req.query.id;
  const productData = req.body;
  try {
    const isProductIdOrUserIdExisting =
      await productHelper.checkproductIdIsExisting(productId, userId);
    if (!isProductIdOrUserIdExisting) {
      console.log(" and userId do not match");
      return res
        .status(400)
        .json({ code: 400, message: "productId and userId do not match" });
    }
    const updateProduct = await productHelper.updateProductbyId(
      productId,
      productData
    );
    console.log("::::::::::::::::::::::::", updateProduct);
    if (!productId) {
      return res
        .status(400)
        .json({ code: 400, message: "product ID is required" });
    }
    if (updateProduct) {
      return res.status(200).json({
        code: 200,
        massage: "product data update succesfuly",
        data: updateProduct,
      });
    } else {
      return res
        .status(404)
        .json({ code: 404, message: " product data is not found  !!!!!" });
    }
  } catch (error: any) {
    console.error("Error  update product  by id:", error);
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error !" });
  }
};

export const deleteProductById = async (req: any, res: Response) => {
  const productId: any = req.query.id;
  const userId = req.body.userdata.userId;
  console.log(":::::::::::userid:::::::", userId);
  try {
    const isProductIdOrUserIdExisting =
      await productHelper.checkproductIdIsExisting(userId, productId);
    if (!isProductIdOrUserIdExisting) {
      console.log("ProductId and userId do not match");
      return res
        .status(400)
        .json({ code: 400, message: "ProductId and userId do not match" });
    }
    const deleteById = await productHelper.deleteProduct(productId);
    console.log("Delete response:", deleteById);
    if (deleteById) {
      return res.status(200).json({
        code: 200,
        message: "product  deleted successfully",
        data: deleteById,
      });
    } else {
      return res.status(404).json({ code: 404, message: "product  not found" });
    }
  } catch (error: any) {
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error: ", error });
  }
};

export const getproductByIdOruserId = async (req: any, res: Response) => {
  try {
    const productid: any = req.query.id;
    const userId = req.body.userdata.userId;

    const product = await productHelper.getProductByIdOruserId(
      productid,
      userId
    );

    if (!product) {
      return res.status(404).json({ error: "Product  not found" });
    }

    return res.status(200).json({ code: 200, data: product });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// add cart controller
export const addToCart = async (req: Request, res: Response) => {
  try {
    const dataObj: AddTocardTableAttributes = {
      userId: req.body.userdata.userId,
      productId: req.body.productId,
      quantity: req.body.quantity,
      status: req.body.status || "checkIn",
    };

    console.log("Data object to add to cart:", dataObj);

    const { userId, productId, quantity } = dataObj;

    const existingCartEntry = await AddTocartHelper.isProductIdOrUserIdExisting(
      userId,
      productId
    );
    if (existingCartEntry) {
      const updatedQuantity = existingCartEntry.quantity + quantity;
      const updateResponse = await AddTocartHelper.updateQuantity(
        userId,
        productId,
        updatedQuantity
      );
      if (updateResponse) {
        console.log("Updated existing cart entry quantity:", updatedQuantity);
        const updatedEntry = await AddTocartHelper.isProductIdOrUserIdExisting(
          userId,
          productId
        );
        return res.status(200).json({ code: 200, userData: updatedEntry });
      }
      console.log("Updated existing cart entry:", existingCartEntry);
      return res.status(200).json({ code: 200, userData: existingCartEntry });
    } else {
      const addtoCart = await AddTocartHelper.createAddTocart(dataObj);
      console.log("Added to cart:", addtoCart);

      return res.status(200).json({ code: 200, userData: addtoCart });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res
      .status(500)
      .json({ code: 500, message: "Error adding to cart", error });
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  const productId = req.query.productId;
  console.log("productId::::::::::", productId);

  try {
    const product = await AddTocartHelper.getcartProfile(productId);
    console.log("product:::::::::::::::::::::::::::::::::::::::", product);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    return res.status(500).json({ error: "Failed to retrieve product" });
  }
};

export const deleteCartById = async (req: any, res: Response) => {
  const cartId = req.query.id;
  const userId = req.body.userdata.userId;
  console.log(":::::::::::userid:::::::", userId);
  console.log(":::::::::::cartid:::::::", cartId);
  try {
    const isCartIdOrUserIdExisting =
      await AddTocartHelper.checkCartIdorUserIdIsExisting(cartId, userId);

    if (!isCartIdOrUserIdExisting) {
      console.log("cartId and userId do not existing");
      return res
        .status(400)
        .json({ code: 400, message: "cartId and userId do not existing" });
    }
    const deleteById = await AddTocartHelper.deleteCart(cartId);
    console.log("Delete response:", deleteById);
    if (deleteById) {
      return res.status(200).json({
        code: 200,
        message: "cart  deleted successfully",
        data: deleteById,
      });
    } else {
      return res.status(404).json({ code: 404, message: "cart  not found" });
    }
  } catch (error: any) {
    return res
      .status(500)
      .json({ code: 500, message: "Internal server error: ", error });
  }
};
export const createRating = async (req: Request, res: Response) => {
  try {
    const dataObj: RatingTableAttributes = {
      userId: req.body.userdata.userId,
      productId: req.body.productId,
      rating: req.body.rating,
      review: req.body.review,
    };
    const { productId, userId, rating } = dataObj;
    
    console.log(dataObj);

    const existingRating = await ratingHelper.checkProductIdorUserIdIsExisting(
      productId,
      userId
    );
    if (rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    if (existingRating) {
      return res.status(400).json({
        code: 400,
        message: "Rating for this product by this user already exists",
      });
    }

    const creatrating: any = await ratingHelper.createProductRating(dataObj);
    console.log("creatrating", creatrating);

    return res.status(200).json({ code: 200, userData: dataObj });
  } catch (error) {
    console.log("Error add  Product Rating ", error);
    return false;
  }
};
 

export const getAllRating = async (req: Request, res: Response) => {


const { productId, } = req.body;
    try {
      const ratingsData = await ratingHelper. getallRatings(productId);
      if (!ratingsData) {
        return res.status(404).json({ message: 'Ratings not found' });
      }
      return res.status(200).json(ratingsData);
    } catch (error) {
      console.error("Error in getAllRatings controller:", error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
