const Post = require("../models/Post");

const postCtrl = {};

postCtrl.getAllPosts = async(req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch(err) {
        res.status(500).send(err)
    }
};

postCtrl.getPostsByCategory = async (req, res) => {
    try {
        const posts = await Post.find({category: req.params.id});
        if(posts) {
            res.status(200).send(posts);
        } else {
            res.status(404).send({ error: "Post not found" });
        }
    } catch (error) {
        res.status(500).send(err)
    }
};

// Post requests
postCtrl.createPost = async (req, res) => {
    const newPost = await Post(req.body);
    try {
        await Post.create(newPost);
        res.status(200).send( {message: "Post created"} );
    } catch (err) {
        res.status(500).send(err);
    }
}
// Update Requests.



module.exports = postCtrl;