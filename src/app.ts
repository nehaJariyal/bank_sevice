import express from "express";
import bodyParser from "body-parser";
import UserRoutes from "./routes/userRoutes";

const app: any = express();
const port: number = 4000;

app.use(bodyParser.json());
app.use("/", UserRoutes.router);

app.listen(port, () => {
  console.log(` The server running on port: ${port}`);
});
