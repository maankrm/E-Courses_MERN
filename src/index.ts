import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoute";

// Entry point >> start app from here
// main app
const app = express();
const port = 3001;

//parsing to json
// middle ware insid express takes json and input in req.body, use that because the default is undefined
app.use(express.json());

// connect mongo db
mongoose
  .connect("mongodb://localhost:27017/medressa")
  .then(() => console.log("db connected >>"))
  .catch((err) => console.log("failed connection !", err));

// create all products via this function
seedInitialProducts();
// use for handle routers and middleware
app.use("/user", userRoute);
app.use("/products", productRoute);

app.listen(port, () => {
  console.log(`server is running at : http://localhost:${port}`);
});
