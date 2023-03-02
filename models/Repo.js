import mongoose from "mongoose";
import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

const RepoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  latest: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  cloudinaryId: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  versions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Recipe",
    required: true,
  },
  tags: {
    type: [String],
    required: false,
    index: true,
  },
  branches: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
      },
    ],
    required: false,
  },
  forkedFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Repo",
    required: false,
  },
  display: {
    type: Boolean,
    default: true,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

RepoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Repo = mongoose.model("Repo", RepoSchema);
export default Repo;
