`use strict`;
import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    text: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
}, { timestamps: true });

export default model('Comment', commentSchema);