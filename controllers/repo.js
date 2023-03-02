import Comment from "../models/Comment.js";
import Recipe from "../models/Recipe.js";
import Repo from "../models/Repo.js";
import User from "../models/User.js";
import express from "express";
import cloudinary from "../middleware/cloudinary.js";
const router = express.Router({ mergeParams: true });

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

// Logged in actions
// const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
// if (!decodedToken.id) {
//   return response.status(401).json({ error: 'token invalid' })
// }
// const user = await User.findById(decodedToken.id)

const repoController = {
  getIndex: async (req, res) => {
    const { page, limit } = {
      page: +req.query.page || 1,
      limit: +req.query.limit || 5,
    };
    try {
      let repos = await (
        await Repo.find({ forkedFrom: { $exists: false } })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort({ creationDate: -1 })
          .populate("userId", "-repos")
      ).filter((repo) => !repo.forkedFrom);
      res.json({ repos, page: page, limit: limit });
    } catch (err) {
      console.error(err);
      res.json({ err: `Something went wrong ${err}` });
    }
  },
  getUserRepos: async (req, res) => {
    try {
      let landedAtUser = req.params.user;
      let userToDisplay = await User.findOne({ username: req.params.user })
        .populate({ path: "repos", options: { sort: { creationDate: -1 } } })
        .lean();

      if (!userToDisplay)
        return res
          .status(404)
          .json({ errors: [{ msg: "User does not exist" }] });
      userToDisplay = {
        username: userToDisplay.username,
        _id: userToDisplay._id || userToDisplay.id,
        repos: userToDisplay.repos.map((repo) => {
          repo.username = userToDisplay.username;
          return repo;
        }),
      };
      res.json({
        repos: userToDisplay.repos,
        user: req.user,
        usernamePage: userToDisplay.username,
      });
    } catch (err) {
      console.error(err);
      res.json({ err: `Something went wrong ${err}` });
    }
  },
  getRepo: async (req, res) => {
    const repo = await Repo.findOne({ _id: req.params.repoId })
      .populate("versions")
      .populate("userId")
      .lean();
    const comments = await Comment.find({ repoId: req.params.repoId })
      .populate("userId")
      .lean();
    let forkedFrom = null;
    if (repo.forkedFrom) {
      forkedFrom = await Repo.findOne({ _id: repo.forkedFrom })
        .populate("versions")
        .populate("userId")
        .lean();
    }
    if (repo) {
      res.status(200).json({
        user: req.user || null,
        repo: {
          title: repo.title,
          latest: repo.latest,
          description: repo.description,
          cloudinaryId: repo.cloudinaryId,
          userId: repo._id,
          username: repo.userId.username,
          image: repo.image,
          tags: repo.tags,
          versions: repo.versions.map((r) => {
            r = { ...r, recipeId: r._id };
            delete r._id;
            return r;
          }),
        },
        username: req.params.user,
        version: req.query.version || repo.latest,
        forkedFrom: forkedFrom,
        comments: comments,
      });
    } else {
      return res.status(404).json({
        errors: [{ msg: "The repository you are looking for does not exist" }],
      });
    }
  },
  createNewRepo: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.user });
      let image;
      if (req.file) image = await cloudinary.uploader.upload(req.file.path);
      const newRecipe = new Recipe({
        title: req.body.title,
        notes: req.body.notes || "",
        instructions: [req.body.instructions],
        ingredients: [
          req.body.ingredients.replace(/<ol>/g, '<ol class="list-decimal">'),
        ],
        userId: req.user.id,
      });

      const newRepo = new Repo({
        title: req.body.title,
        description: req.body.description,
        userId: req.user.id,
        image: image ? image.secure_url : null,
        cloudinaryId: image ? image.public_id : null,
        versions: [newRecipe._id],
        tags: req.body.tags.length > 0 ? req.body.tags.split(" ") : [],
      });

      newRecipe.repo = newRepo._id;
      const savedRecipe = await newRecipe.save();
      const savedRepo = await newRepo.save();

      user.repos = user.repos.concat(savedRepo._id);
      await user.save();

      res.status(200).json({ message: "Success" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
  deleteRecipe: async (req, res) => {
    if (req.user.username !== req.params.user)
      return res.status(401).json({
        message: "You do not have permission to delete this repository",
      });
    try {
      let repo = await Repo.findById({ _id: req.params.repoId });
      if (repo.cloudinaryId != null) {
        await cloudinary.uploader.destroy(repo.cloudinaryId);
      }
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { repos: req.params.repoId } },
        { new: true }
      );
      await Recipe.deleteMany({ repo: req.params.repoId });
      await Comment.deleteMany({ repoId: req.params.repoId });
      await Repo.findOneAndDelete({ _id: req.params.repoId });

      res.status(202).json({ message: "Repository was removed" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "An error occured during deletion" });
    }
  },
  commitRecipe: async (req, res) => {
    try {
      console.log(`commit recipe file`, req.file);
      console.log(`commit recipe body`, req.body);

      //   const currentRepo = await Repo.findOne({ _id: req.body.repoId });
      //   const newRecipe = new Recipe({
      //     title: req.body.title,
      //     notes: req.body.notes,
      //     ingredients: [req.body.ingredients],
      //     instructions: [req.body.instructions],
      //     userId: req.user.id,
      //     repo: req.body.repoId,
      //   });

      //   // console.log(currentRepo)
      //   const savedRecipe = await newRecipe.save();
      //   await Repo.findOneAndUpdate(
      //     { _id: req.body.repoId },
      //     {
      //       // description: req.body.description,
      //       latest: currentRepo.latest + 1,
      //       $push: { versions: savedRecipe._id },
      //     }
      //   );
      //   console.log("Recipe updated");
      //   res.redirect(`/${req.user.username}/${req.body.repoId}`);
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  },
};
export default repoController;
