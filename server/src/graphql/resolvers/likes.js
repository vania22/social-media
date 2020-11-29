import {isAuthenticated} from "../../utils/isAuthenticated";

export const like = {
    Mutation: {
        async toggleLike(parent, {postId}, {Post, req}, info) {
            const user = await isAuthenticated(req)

            const post = await Post.findById(postId);

            if (!post) {
                throw new Error('Post not found')
            }

            const userLikeIndex = post.likes.findIndex(l => l.user._id.toString() === user._id.toString())

            if (userLikeIndex === -1) {
                post.likes.unshift({
                    createdAt: new Date().toISOString(),
                    user: user._id
                })
            } else {
                post.likes.splice(userLikeIndex, 1)
            }

            await post.save()

            return post
        }
    }
}
