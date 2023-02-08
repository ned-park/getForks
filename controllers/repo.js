import Comment from "../models/Comment.js"
import Recipe from "../models/Recipe.js"
import Repo from "../models/Repo.js";
import User from "../models/User.js";

const repoController = {
  getIndex: async (req, res) => {
    console.log(req.query);
    const { page, limit } = {
      page: +req.query.page || 1,
      limit: +req.query.limit || 5,
    };
    // console.log(page, limit);
    try {
      let repos = await (
        await Repo.find({ forkedFrom: { $exists: false } })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .sort({ creationDate: -1 })
          .populate("userId")
      ).filter((repo) => !repo.forkedFrom);
      res.json({
        user: null,
        repos: repos.map((r) => ({
          title: r.title,
          latest: r.latest,
          description: r.description,
          cloudinaryId: r.cloudinaryId,
          userId: r._id,
          username: r.userId.username,
          image: r.image,
          tags: r.tags,
        })),
        page: page,
        limit: limit,
      });
    } catch (err) {
      console.error(err);
      res.json({ err: `Something went wrong ${err}` });
    }
  },
  getUserRepos: async (req, res) => {
    try {
      let landedAtUser = req.params.user;
      let userToDisplay = await User.findOne({ username: landedAtUser })
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
          repo.username = userToDisplay.username
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
      console.log(repo)
      res.json({
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
          versions: repo.versions.map(r => {
            r = {...r, recipeId: r._id}
            delete r._id
            return r
          })
        },
        username: req.params.user,
        version: req.query.version || repo.latest,
        forkedFrom: forkedFrom,
        comments: comments,
      });
    } else {
      return res
        .status(404)
        .json({
          errors: [
            { msg: "The repository you are looking for does not exist" },
          ],
        });
    }
  },
};
export default repoController;
