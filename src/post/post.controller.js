import Post from "./post.model.js";

export async function getPosts(req, res) {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

export async function createPost(req, res) {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

export async function updatePost(req, res) {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

export async function deletePost(req, res) {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}