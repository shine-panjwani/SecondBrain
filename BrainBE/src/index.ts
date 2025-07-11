import express from "express";
import mongoose from "mongoose";
import { Request, Response, Express } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const app: Express = express();
import { User, Tag, Content, Link } from "./db";
import { JWT_SECRET, randomHash } from "./utils/utils";
import { AuthReq } from "./types/types";
import {
  UserInputValidation,
  ContentValidation,
  LinkValidation,
} from "./utils/utils";
import cors from "cors"
import { userAuth } from "./middleware/userAuth";
app.use(express.json());
app.use(cors())
app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const results = UserInputValidation.safeParse(req.body);
  if (!results.success) {
    return res.status(400).json({
      msg: "Invalid inputs",
      error: results.error.errors,
    });
  }
  const { username, password } = results.data;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        msg: "User already exists!!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    console.log("user" );
    res.status(201).json({
      msg: "User added",
      user: { username },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});
app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const parsedData = UserInputValidation.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      msg: "Invalid inputs",
      error: parsedData.error.errors,
    });
  }
  try {
    const { username, password } = parsedData.data;
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({
        msg: "User doesn't exists",
      });
    }
    const unHashedPassword = await bcrypt.compare(password, findUser.password);
    if (!unHashedPassword) {
      return res.status(401).json({
        msg: "Incorrect password",
      });
    }
    const token = jwt.sign({ id: findUser._id }, JWT_SECRET);
    res.status(200).json({
      msg: "Signed in successfully",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});
app.post("/api/v1/content", userAuth, async (req: AuthReq, res: Response) => {
  const parsedData = ContentValidation.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({
      msg: "Invalid inputs",
      error : parsedData.error.errors
    });
  }
  console.log(parsedData.data);
  try {
    const { title, type, link } = parsedData.data;
    const existingContent = await Content.findOne({ title, userid: req.id });
    if (existingContent) {
      return res.status(409).json({
        msg: "Course already exists!!",
      });
    }
    await Content.create({ title, type, link, userid: req.id });
    res.status(200).json({
      msg: "Content added!!",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      errorss : error
    });
  }
});
app.get("/api/v1/content", userAuth, async (req: AuthReq, res: Response) => {
  const userId = req.id;
  try {
    const content = await Content.find({ userid: userId }).populate(
      "userid",
      "username"
    );
    console.log(content);

    if (!content.length) {
      res.status(200).json({
        msg: "Content found",
        content: content,
      });
    }
    res.status(200).json({
      msg: "Found content",
      content: content,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
    });
  }
});
app.delete("/api/v1/content", userAuth, async (req: AuthReq, res: Response) => {
  const contentId = req.body._id;
  const userId = req.id;
  try {
    await Content.deleteMany({ userid: userId, _id: contentId });
    res.status(200).json({
      msg: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: "server error",
    });
  }
});
app.post("/api/v1/brain/share",userAuth,
  async (req: AuthReq, res: Response) => {
    try {
      const parsedData = LinkValidation.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({
          msg: "Invalid inputs",
        });
      }
      const { share } = parsedData.data;
      if (share) {
        const exist = await Link.findOne({
          userId : req.id
        })
        if(exist){
          return res.status(200).json({
            hash : exist.hash
          })
        }
        await Link.create({
          userId: req.id,
          hash: randomHash(),
        });
      } else {
        await Link.deleteOne({
          userId: req.id,
        });
      }
      return res.status(200).json({
        msg: "Updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server error!!",
      });
    }
  }
);
app.get("/api/v1/brain/:shareLink",userAuth,
  async (req: AuthReq, res: Response) => {
    const shareLink = req.params.shareLink;
    try {
      const existingLink = await Link.findOne({ hash: shareLink });
      if (!existingLink) {
        return res.status(411).json({
          msg: "Invalid share link",
        });
      }
      const ContentData = await Content.findOne({userid : existingLink?.userId})
      if(!ContentData){
        return res.status(411).json({
          msg: "Content not found",
        });
      }
      const UserData = await User.findOne({_id: ContentData?.userid})
      if(!UserData){
        return res.status(411).json({
          msg: "User not found",
        });
      }
      res.status(200).json({
        existingLink: existingLink,
        content : ContentData,
        link : ContentData?.link,
        UserData : UserData
      });
    } catch (error) {
      res.status(500).json({
        msg :"Server error"
      })
    }
  }
);
async function serverCall() {
  app.listen(3000, () => {
    console.log("Server listening to port 3000");
  });
  console.log("MongoDb connected")
  await mongoose.connect(
    "mongodb+srv://shinepanjwani18:qwerty1@cluster0.vnlvtfo.mongodb.net/Brainly"
    // "mongodb+srv://shinepanjwani18:qwerty1@cluster0.vnlvtfo.mongodb.net/Brainly"
  );
  console.log("MongoDb connected")
}
serverCall();
