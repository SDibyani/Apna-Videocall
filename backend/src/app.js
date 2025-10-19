import express from 'express';
//connects express and socket
import {createServer} from "node:http";

import {Server} from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from './controllers/socketManager.js';

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app= express();
const server= createServer(app);
const io= connectToSocket(server);


app.use(cors({
  origin: ["https://apna-videocall-2.onrender.com"], // your frontend URL
  credentials: true,
}));


app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));

app.use("/api/v1/users", userRoutes);





const start= async()=>{
    app.set("mongo_user")
       const connectionDb = await mongoose.connect("mongodb+srv://sdibyani123:a3kXeJmx7qdsnQJz@apnavideocall.vncpmlg.mongodb.net/?retryWrites=true&w=majority&appName=apnavideocall")

       console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`)

    server.listen(app.get("port"),()=>{
        console.log("Listening on port 8000");
    });
}

start();
