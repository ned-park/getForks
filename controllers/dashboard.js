const cloudinary = require("../middleware/cloudinary");
const Recipe = require('../models/Recipe')
const Repo = require('../models/Repo')
const User = require('../models/User')
const Comment = require('../models/Comment')

module.exports = {
    getUser: async (req, res) => {
        try {
            let landedAtUser = req.baseUrl.slice(1,) || req.user
            let userToDisplay = await User.findOne({ username: landedAtUser }).populate({ path: 'repos', options: { sort: { 'creationDate': -1 } } }).lean()

            if (!userToDisplay) return res.status(404).json({ errors: [{ msg: 'User does not exist' }] })
            userToDisplay = {
                username: userToDisplay.username,
                _id: userToDisplay._id || userToDisplay.id,
                repos: userToDisplay.repos.map(repo => {
                    repo.userId = {
                        ...repo.userId,
                        username: userToDisplay.username
                    }
                    return repo
                })
            }
            if (userToDisplay) {
                res.render('dashboard.ejs', { repos: userToDisplay.repos, user: req.user, usernamePage: userToDisplay.username })
            } else {
                res.render('dashboard.ejs', { user: null, usernamePage: landedAtUser })
            }
        } catch (err) {
            console.log(err)
        }
    },
    getRepo: async (req, res) => {
        let usernamePage = req.baseUrl.slice(1,)
        const repo = await Repo.findOne({ _id: req.params.repoId }).populate('versions').populate('userId').lean()
        const comments = await Comment.find({ repoId: req.params.repoId }).populate('userId').lean()
        let forkedFrom = null
        if (repo.forkedFrom) {
            forkedFrom = await Repo.findOne({ _id: repo.forkedFrom }).populate('versions').populate('userId').lean()
        }
        // console.log(repo)
        if (repo) {
            res.render('repo.ejs', { user: req.user || null, repo: repo, usernamePage: usernamePage, version: (req.query.version || repo.latest), forkedFrom: forkedFrom, comments: comments})
        } else {
            return res.status(404).json({ errors: [{ msg: 'The repository you are looking for does not exist' }] })
        }
    },
    editRepoImage: async (req, res) => {
        try {
            let image
            if (req.file) image = await cloudinary.uploader.upload(req.file.path);
            await Repo.findByIdAndUpdate(req.body.repoId, {
                image: image.secure_url,
                cloudinaryId: image.public_id
            })
            res.redirect(`/${req.user.username}/${req.body.repoId}`)
        } catch (err) {
            console.log(err)
        }
    },
    createRepoFromRecipe: async (req, res) => {
        try {
            console.log(req.file)
            const user = await User.findById(req.user.id)
            let image
            if (req.file) image = await cloudinary.uploader.upload(req.file.path);
            const newRecipe = new Recipe({
                title: req.body.title,
                notes: req.body.notes || '',
                instructions: [req.body.instructions],
                ingredients: [req.body.ingredients.replace(/<ol>/g, '<ol class="list-decimal">')],
                userId: req.user.id
            })

            const newRepo = new Repo({
                title: req.body.title,
                description: req.body.description,
                userId: req.user.id,
                image: image ? image.secure_url : null,
                cloudinaryId: image ? image.public_id : null,
                versions: [newRecipe._id],
                tags: req.body.tags.length > 0 ? req.body.tags.split(' ') : [],
            })

            newRecipe.repo = newRepo._id
            const savedRecipe = await newRecipe.save()
            const savedRepo = await newRepo.save()

            user.repos = user.repos.concat(savedRepo._id)
            await user.save()

            res.redirect(`/${req.user.username}`)
        } catch (err) {
            console.log(err)
        }
    },
    forkRepo: async (req, res) => {
        try {
            const originalRepo = await Repo.findOne({ _id: req.body.repoId }).populate('versions').populate('branches')
            const recipes = await Recipe.find({ repo: req.body.repoId })
            console.log(originalRepo.versions)
            console.log(recipes.length)

            let versionsClone = recipes.map(recipe =>
                new Recipe({
                    title: recipe.title,
                    notes: recipe.notes,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                    userId: req.user.id,
                    clonedFrom: recipe.userId
                })
            )

            let newVersionsId = versionsClone.map(recipe => recipe._id)

            const newRepo = new Repo({
                title: originalRepo.title,
                description: originalRepo.description,
                latest: originalRepo.latest,
                userId: req.user.id,
                versions: newVersionsId,
                cloudinaryId: originalRepo.cloudinaryId,
                image: originalRepo.image,
                tags: [].concat(...originalRepo.tags),
                branches: [], //eventually deep copy if branching implemented
                forkedFrom: originalRepo._id,
                display: true,
            })

            console.log('new Repo in progress...')
            let promises = versionsClone.map(r => {
                console.log(r)
                r.repo = newRepo._id
                return r.save()
            })
            let fulfilled = await Promise.all(promises)
            const savedRepo = await newRepo.save()

            await User.findOneAndUpdate(
                { _id: req.user.id },
                { $push: { repos: newRepo._id } }
            )

            console.log('Repo was cloned!')

            res.redirect(`/${req.user.username}/${savedRepo._id}`)
        } catch (err) {
            console.log(err)
        }
    },
    commitRecipe: async (req, res) => {
        try {
            console.log(`RepoId:`, req.body.repoId)

            const currentRepo = await Repo.findOne({ _id: req.body.repoId })
            const newRecipe = new Recipe({
                title: req.body.title,
                notes: req.body.notes,
                ingredients: [req.body.ingredients],
                instructions: [req.body.instructions],
                userId: req.user.id,
                repo: req.body.repoId
            })

            // console.log(currentRepo)
            const savedRecipe = await newRecipe.save()
            await Repo.findOneAndUpdate({ _id: req.body.repoId }, {
                // description: req.body.description,
                latest: currentRepo.latest + 1,
                $push: { versions: savedRecipe._id }
            })
            console.log('Recipe updated')
            res.redirect(`/${req.user.username}/${req.body.repoId}`)
        } catch (err) {
            console.log(err)
        }
    },
    deleteRecipe: async (req, res) => {
        console.log(req.body)

        if (req.user.username != req.body.username)
            return res.status(404).json({ errors: [{ msg: 'You do not have permission to delete this repository' }] })
        try {
            let repo = await Repo.findById({ _id: req.body.repoId });
            if (repo.cloudinary != null) {
                await cloudinary.uploader.destroy(repo.cloudinaryId);
            }
            await User.findOneAndUpdate(
                { _id: req.user.id },
                { $pull: { repos: req.body.repoId } },
                { new: true }
            )
            await Recipe.deleteMany({ repo: req.body.repoId })
            await Comment.deleteMany({ repoId: req.body.repoId })
            await Repo.findOneAndDelete({ _id: req.body.repoId })
            console.log('Deleted Repo')
            res.redirect(`/${req.user.username}`)
        } catch (err) {
            console.log(err)
            res.redirect(`/${req.user.username}`)
        }
    }
}    