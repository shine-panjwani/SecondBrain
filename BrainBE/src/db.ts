import mongoose, { model, Model } from "mongoose";
import { Schema } from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const contentSchema = new Schema({
  title: { type: String, required: true, unique: true },
  type: {
    type: String,
    // enum: ["links", "tweet", "videos", "tags", "documents"],
    required: true,
  },
  link: { type: String },
  // tags: { type: String, ref: "Tag" },
  userid: { type: ObjectId, required: true, ref: "User" },
});
const tagsSchema = new Schema({
  title: { type: String },
});
const linksSchhema = new Schema({
  hash: { type: String, unique :true },
  userId: { type: ObjectId, required: true, ref: "User", unique: true },
});
export const User = mongoose.model("User", userSchema);
export const Content = mongoose.model("Content", contentSchema);
export const Tag = mongoose.model("Tag", tagsSchema);
export const Link = mongoose.model("Link", linksSchhema);
