import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import prismaClient from "@repo/db/client";

const app = express();
app.use(express.json());
app.post("/signin", (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
  }
  const username = req.body.username;
  const password = req.body.password;
  const token = jwt.sign({ username }, JWT_SECRET);
  res.json({
    message: "signin",
  });
});

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403);
    return;
  }
  try{
    await prismaClient.user.create({
    data: {
      email: parsedData.data?.username,
      password: parsedData.data?.password,
      name: parsedData.data?.name,
    },
  });
  res.json({
    message: "signin",
  });
  }catch(e){
    res.status(411).json({
        message: "could not sign up"
    })
  }
});

app.post("/room", middleware, (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "invalid input",
    });
  }

  res.json({
    message: "room",
  });
});

app.listen(3001);
