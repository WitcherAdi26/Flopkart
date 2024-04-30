import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

const app=express();
app.use(cors());

//configure env
dotenv.config();

//database config
connectDB();

//middlewares
app.use(express.json());
app.use(morgan("dev")); //logs requests to console

//routes
app.use("/api",authRoutes);

//REST API
// app.get("/",(req,res)=>{
//     res.send("<h1>Hello</h1>");
// });

const port=process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});