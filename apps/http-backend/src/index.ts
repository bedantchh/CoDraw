import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from "@repo/common/types"

const app = express();

app.post("/signin",(req,res)=>{
    const data = SigninSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            "message":"Incorrect inputs"
        })
    }
    const username = req.body.username;
    const password = req.body.password;
    res.json({
        "message": "signin"
    })
})

app.post("/signup",(req,res)=>{
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.status(403)
        return
    }
    const username = req.body.username;
    const password = req.body.password;

    const token = jwt.sign({username},JWT_SECRET)
    res.json({
        "message": "signin"
    })
})

app.post("/room",middleware,(req,res)=>{
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message:"invalid input"
        })
    }

    res.json({
        "message": "room"
    })
})


app.listen(3001)