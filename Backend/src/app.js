import express from "express";
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todoRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors"

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if using cookies or auth headers
  })
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/primetrade/user", userRouter);
app.use("/api/v1/primetrade/todo", todoRouter);
app.use("/api/v1/primetrade/profile", profileRouter);
app.use("/api/v1/primetrade/auth", authRouter);



export { app };