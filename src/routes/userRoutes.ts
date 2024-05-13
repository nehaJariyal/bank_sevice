import * as express from "express";
import UserController from "../controller/userController";
import jwtMiddeleware from "../../middleware/jwt.authToken";
import * as  transationControler from "../controller/transationControler";
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

      //tansation
      .post("/deposit",jwtMiddeleware,transationControler.createDeposit)
      .post("/withdrawal",jwtMiddeleware,transationControler.createWithdrawal)

      // get all profile
      .post('/getprofile',jwtMiddeleware,userController.getAllProfile)
  }
}
export default new UserRoutes();
