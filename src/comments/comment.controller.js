import Comment from "./comment.model.js";

// Sintaxis: Clase con métodos estáticos
class CommentController {
    static async findAll(req, res) {
        try {
            const comments = await Comment.find().populate('userId', 'username');
            res.status(200).send(comments);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    static async addOne(req, res) {
        try {
            const comment = new Comment(req.body);
            await comment.save();
            res.status(201).send(comment);
        } catch (e) {
            res.status(400).send(e);
        }
    }

    static async modify(req, res) {
        try {
            const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).send(comment);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    static async remove(req, res) {
        try {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).send({ msg: 'Eliminado' });
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

export default CommentController;