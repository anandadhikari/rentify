import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import estateRoute from "./routes/estate.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: (origin, callback) => {
    // Check if the origin is allowed, or allow all origins by returning true
    callback(null, true);
  },
  credentials: true // Allow credentials to be included in the request if needed
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/estates", estateRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  connect();
  console.log("Backend server is running!");
});
