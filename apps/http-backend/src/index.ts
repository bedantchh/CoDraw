import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";

const app = express()
app.use(express())

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    res.json({
        "message": "signin"
    })
})

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const token = jwt.sign({username},JWT_SECRET)
    res.json({
        "message": "signin"
    })
})

app.post("/room",middleware,(req,res)=>{
    res.json({
        "message": "room"
    })
})


app.listen(3001)