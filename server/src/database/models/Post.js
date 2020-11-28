import {model, Schema} from 'mongoose';

const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    }
});

const Post = model('Post', postSchema);

export default Post;
