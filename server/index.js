import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import userRoute from "./routes/users.js";

const app = express();
dotenv.config();

// using bodyParser to pass the file
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); //for connection to frotend

// Routes
app.use("/posts", postRoutes);
app.use("/user", userRoute);

// connection to mongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connected successfully"))
  .catch((error) => console.log(error.message));

// server listening on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
