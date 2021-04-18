const express = require("express")
const posts = reqiure("./posts-model")

//create a standalone express router
const router = express.Router()

router.get("/api/posts", (req, res) => {
    posts.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        })
})

router.get("/api/posts/:id", (req, res) => {
    posts.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "EThe post information could not be retieved"
            })
        })
})

router.post("/api/posts", (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    posts.insert(req.body)
        .then((post) => {
            res.status(201).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                message: "The post information could not be retrieved"
            })
        })
})

router.put("/api/posts/:id", (req, res) => {
    if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specific ID does not exist"
        })
    }
    posts.update(req.params.id)
    .then((post) => {
        res.status(201).json(post)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: "The post information  could not be modified."
        })
    })
})

router.delete("/api/posts/:id", (req, res) => {
    if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specific ID does not exist"
        })
    }
    posts.delete(req.params.id)
    .then((post) => {
        res.status(200).json(post)
    })
    .catch((post) => {
        res.status(500).json({
            message: "The post could not be removed"
        })
    })
})

router.get("/api/posts/:id/comments", (req, res) => {
    if (!req.params.id) {
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }
    posts.findCommentId(req.params.postId)
    .then((comments) => {
        res.status(200).json(comments)
    })
    .catch((error) => {
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    })
})

module.exports = router