// import User from "../models/User"
import Repo from "../models/Repo.js"

const homeController = {
 getIndex: async (req,res) => {
      console.log(req.query)
      const { page, limit} = { page: +req.query.page || 1, limit: +req.query.limit || 5};
      console.log(page, limit)
      try {
        const repos = await (await Repo.find({ forkedFrom: { $exists: false } } ).limit(limit * 1).skip((page - 1) * limit).sort({creationDate: -1}).populate('userId')).filter(repo => !repo.forkedFrom)
        res.json({user: null, repos: repos, page: page, limit: limit})
        } catch(err) {
          console.log(err)
          res.json({err: `Something went wrong ${err}`})
        }
    }
  }
  export default homeController