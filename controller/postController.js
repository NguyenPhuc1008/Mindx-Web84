import PostModel from '../models/PostModel.js';

const posts = {
    add: async (req, res) => {
        const { content } = req.body;
        try {
            if (!content) {
                return res.json({
                    success: false,
                    message: 'Nội dung không được để trống'
                });
            }

            const newPost = {
                userId: req.user._id,
                content
            };

            const post = await PostModel.create(newPost);
            res.json({
                success: true,
                message: 'Tạo bài post thành công',
                post
            });
        } catch (error) {
            res.json({
                success: false,
                message: error.message
            });
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.json({
                success: false,
                message: 'Nội dung không được để trống'
            });
        }

        try {
            const post = await PostModel.findById(id);
            if (!post) {
                return res.json({
                    success: false,
                    message: 'Không tìm thấy bài post'
                });
            }

            if (post.userId.toString() !== req.user._id.toString()) {
                return res.json({
                    success: false,
                    message: 'Không có quyền cập nhật bài post này'
                });
            }

            post.content = content;
            post.updatedAt = new Date();
            const updatedPost = await post.save();

            res.json({
                success: true,
                message: 'Cập nhật bài post thành công',
                post: updatedPost
            });
        } catch (error) {
            res.json({
                success: false,
                message: error.message
            });
        }

    }
}
export default posts