import * as express from "express";
import UserController from "../controller/userController";
import jwtMiddeleware from "../../middleware/jwt.authToken";
import * as  transactionControler from "../controller/transationControler";
import userController from "../controller/userController";
class UserRoutes {
  public router: any;

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router
      .get("/", (req: express.Request, res: express.Response) => {
        res.json({ data: "welcome !" });
      })
      .post("/sign", UserController.createUser)
      .post("/login", UserController.userLogin)
      .get("/getUser", jwtMiddeleware, UserController.getUserByMail)
      .post("/updateUser", jwtMiddeleware, userController.updateUserById)
      .post("/deleteUser",jwtMiddeleware,userController.deleteuserByStatus)
      .post("/blockUser",jwtMiddeleware,userController.blockeduserByStatus)

      // card
      .post("/card", jwtMiddeleware, userController.createAtmCard)
      .delete("/deleteCard", jwtMiddeleware, userController.deleteCardById)
      .post("/updateCard", jwtMiddeleware, userController.updateCardById)
      .get('/getCard',jwtMiddeleware,userController.getCardByIdOruserId)

      //tansaction
      .post("/deposit",jwtMiddeleware,transactionControler.createDeposit)
      .post("/withdrawal",jwtMiddeleware,transactionControler.createWithdrawal)

      // get all profile
      .post('/getprofile',jwtMiddeleware,userController.getAllProfile)


      // add product data
      .post('/product',jwtMiddeleware,transactionControler.addProduct)
      .post('/updateProduct',jwtMiddeleware,transactionControler.updateProductbyId)
      .post('/delProdct',jwtMiddeleware,transactionControler.deleteProductById)
      .get('/getProduct',jwtMiddeleware,transactionControler.getproductByIdOruserId)

//  add  to card 
      .post('/addCart',jwtMiddeleware,transactionControler.addToCart)
      .post('/getAllProduct',jwtMiddeleware,transactionControler.getAllProduct)
      .post('/deleteCart',jwtMiddeleware,transactionControler.deleteCartById)
      
      // create rating
      .post('/createRating',jwtMiddeleware,transactionControler.createRating)
      .post('/getRating',jwtMiddeleware,transactionControler.getAllRating)


  }
}
export default new UserRoutes();
