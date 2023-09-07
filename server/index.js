import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import postRoutes from "./routes/postRoutes.js"

import connectDB from "./mongodb/connect.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({"limit" : "50mb"}));

app.use("/api/v1/post", postRoutes);

app.get("/", async (req,res) => {
    res.send("hello")
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080,"192.168.1.12", () => console.log("Server has started on port 8080"));
    } catch(err) {
        console.log(err);
    }
}
startServer();