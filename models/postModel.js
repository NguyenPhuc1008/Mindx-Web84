import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    content: { type: String, required: true, }
}, { timestamps: true })

const PostsModel = mongoose.model.post || mongoose.model('post', postSchema)
export default PostsModel