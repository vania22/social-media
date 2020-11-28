export const post = {
    Query: {
        async getPosts(parent, args, {posts}, info) {
            return posts.find().toArray();
        }
    },
    Post: {

    }
}
