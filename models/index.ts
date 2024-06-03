import database from "../db/sequelize";
import AccountModel from "./accountModel";
import AddCartModel from "./addCartModel";
import CardModel from "./cardModel";
import DepositModel from "./depositModel";
import ProductModel from "./productModel";
import RatingModel from "./ratingModel";
import TransactionModel from "./transactionModel";
import userModel from "./userModel";
import WithdrawalModel from "./withdrawalModel";
const models = [
  userModel,
  CardModel,
  AccountModel,
  DepositModel,
  WithdrawalModel,
  TransactionModel,
  ProductModel,
  AddCartModel,
  RatingModel,
];
models.forEach((model) => {
  model.initialize(database);
});

userModel.hasMany(AccountModel, {
  foreignKey: "userId",
  as: "account",
});
userModel.hasMany(CardModel, {
  foreignKey: "userId",
  as: "card",
});

userModel.hasMany(DepositModel, {
  foreignKey: "userId",
  as: "deposit",
});
userModel.hasMany(WithdrawalModel, {
  foreignKey: "userId",
  as: "withdrawal",
});
userModel.hasMany(TransactionModel, {
  foreignKey: "userId",
  as: "transaction",
});
userModel.hasMany(ProductModel, {
  foreignKey: "userId",
  as: "product",
});
userModel.hasMany(AddCartModel, {
  foreignKey: "userId",
  as: "addToCard",
});

ProductModel.hasMany(AddCartModel, {
  as: "addToCard",
  foreignKey: "productId",
});
AddCartModel.belongsTo(ProductModel, {
  as: "product",
  foreignKey: "id",
});

ProductModel.hasMany(RatingModel, {
  as: "rating",
  foreignKey: "productId",
});

RatingModel.belongsTo(ProductModel, {
  as: "product",
  foreignKey: "id",
});

export = {
  database,
  userModel,
  CardModel,
  AccountModel,
  DepositModel,
  WithdrawalModel,
  TransactionModel,
  ProductModel,
  AddCartModel,
  RatingModel,
};
