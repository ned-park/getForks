// import User from "../models/User"
import Repo from "../models/Repo.js";
import User from "../models/User.js"

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
          id: r._id,
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
      let landedAtUser = req.baseUrl.slice(1) || req.user;
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
          repo.userId = {
            ...repo.userId,
            username: userToDisplay.username,
          };
          return repo;
        }),
      };
      if (userToDisplay) {
        res.json({
          repos: userToDisplay.repos,
          user: req.user,
          usernamePage: userToDisplay.username,
        });
      } else {
        res.render("dashboard.ejs", { user: null, usernamePage: landedAtUser });
      }
    } catch (err) {
      console.error(err);
      res.json({ err: `Something went wrong ${err}` });
    }
  },
};
export default repoController;
