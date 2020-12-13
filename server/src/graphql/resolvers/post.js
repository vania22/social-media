import {isAuthenticated} from "../../utils/isAuthenticated";

export const post = {
    Query: {
        async getPosts(parent, {skip}, {Post}, info) {
            return Post.find().sort({['createdAt']: -1}).limit(9).skip(skip)
        },
        async getPost(parent, {_id}, {Post}, info) {
            const post = await Post.findById(_id)

            if (!post) {
                throw new Error('Post not found')
            }

            return post
        }
    },
    Mutation: {
        async createPost(parent, {body}, {Post, req}, info) {
            const user = await isAuthenticated(req);

            const post = new Post({
                body,
                user: user._id,
                username: user.username,
            });

            await post.save()

            return post
        },
        async deletePost(parent, {_id}, {Post, req}, info) {
            const user = await isAuthenticated(req);

            const post = await Post.findOne({_id, user: {_id: user._id}})

            if(!post) {
                throw new Error('Post not found, maybe it was deleted?')
            }

            await post.remove()

            return post
        },
    },
    Post: {
        async user(parent, args, {User}, info) {
            const user = await User.findById(parent.user)

            if(!user) {
                throw new Error('User for created post not found')
            }

            return user
        },
        commentsCount(parent) {
            return parent.comments.length
        },
        likesCount(parent) {
            return parent.likes.length
        }
    }
}
