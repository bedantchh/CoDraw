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

app.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
    });
  }
  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data?.username,
      password: parsedData.data?.password,
    },
  });
  if (!user) {
    res.status(403).json("User not found");
  }
  const token = jwt.sign({ userId: user?.id }, JWT_SECRET);
  res.json({
    message: `Signed in, jwt: ${token}`,
  });
});

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403);
    return;
  }
  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.username,
        password: parsedData.data?.password,
        name: parsedData.data?.name,
      },
    });
    res.json({
      message: `signed up! userid: ${user.id}`,
    });
  } catch (e) {
    res.status(411).json({
      message: "could not sign up",
    });
  }
});

app.post("/room", middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "invalid input",
    });
    return;
  }
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ message: "userId is required" });
    return;
  }
  if (!parsedData.data?.name) {
    res.status(400).json({ message: "room name is required" });
    return;
  }
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data?.name,
        adminId: userId,
      },
    });
    res.json({
      message: `room id: ${room.id}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create room",
    });
  }
});

app.get("/chats/:roomId",async(req,res)=>{
  const roomId = Number(req.params.roomId);
  const messages = await prismaClient.chat.findMany({
    where: {
      roomId: roomId
    },
    orderBy:{
      id: "desc",

    } ,
    take: 50
  })
  res.json({
    messages
  })
})
app.listen(3001);
