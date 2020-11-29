import {isAuthenticated} from "../../utils/isAuthenticated";

export const post = {
    Query: {
        async getPosts(parent, args, {Post}, info) {
            return Post.find()
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
                createdAt: new Date().toISOString()
            });

            await post.save()

            return post
        },
        async deletePost(parent, {_id}, {Post}, info) {

        },
    },
    Post: {}
}
