import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";

// Entry point >>
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

// use for handle routers and middleware
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`server is running at : http://localhost:${port}`);
});
