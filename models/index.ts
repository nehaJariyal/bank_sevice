import database from "../db/sequelize";
import userModel from "./userModel";
import CardModel from "./cardModel";
import AccountModel from "./accountModel";
import DepositModel from "./depositModel";
import WithdrawalModel from "./withdrawalModel";
import 	TransactionModel from "./transactionModel";
const models = [userModel,
   CardModel,
    AccountModel,
   DepositModel,
   WithdrawalModel,
   	TransactionModel];
models.forEach((model) => {
  model.initialize(database);
});

userModel.hasMany(AccountModel,{
  foreignKey: 'userId',
  as: 'account',  

})
userModel.hasMany(CardModel,{
  foreignKey: 'userId',
  as: 'card',  

})

userModel.hasMany(DepositModel,{
  foreignKey: 'userId',
  as: 'deposit',  
})
userModel.hasMany(WithdrawalModel,{
  foreignKey: 'userId',
  as: 'withdrawal',  
})
userModel.hasMany(TransactionModel,{
  foreignKey: 'userId',
  as: 'transaction',  
})

export = { database, 
  userModel, CardModel, AccountModel,DepositModel,WithdrawalModel ,	TransactionModel};


