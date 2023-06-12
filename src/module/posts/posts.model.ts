import mongoose, { Document } from "mongoose";
import { IPost } from "./posts.interface";

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  like: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  comment: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
      },
      text: {
        type: String,
        require: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model<IPost & Document>("Post", PostSchema);
