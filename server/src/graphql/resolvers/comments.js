import {isAuthenticated} from "../../utils/isAuthenticated";

export const comment = {
    Mutation: {
        async createComment(parent, {input}, {Post, req}, info) {
            const user = await isAuthenticated(req)

            let {postId, body} = input

            if(!body.trim()) {
                throw new Error('Comment body must not be empty')
            }

            const post = await Post.findById(postId);

            if(!post) {
                throw new Error('Post not found')
            }

            post.comments.unshift({
                body,
                createdAt: new Date().toISOString(),
                user: user._id
            })

            await post.save()

            return post
        },
        async deleteComment(parent, {postId, commentId}, {Post, req}, info) {
            const user = await isAuthenticated(req)

            const post = await Post.findById(postId)

            if(!post) {
                throw new Error('Post not found')
            }

            const commentIndex = post.comments.findIndex(c => c._id.toString() === commentId)

            if(commentIndex === -1) {
                throw new Error('Comment not found')
            }

            if(post.comments[commentIndex].user._id.toString() !== user._id.toString()) {
                throw new Error('Not authorized')
            }

            post.comments.splice(commentIndex, 1)

            await post.save()

            return post
        }
    },
    Comment: {
        async user(parent, args, {User}, info) {
            const user = await User.findById(parent.user)

            if(!user) {
                throw new Error('User for created post not found')
            }

            return user
        }
    }
}
