import {model, Schema} from 'mongoose';

const postSchema = new Schema({
    body: String,
    createdAt: String,
    comments: [
        {
            body: String,
            user: {
                type: Schema.ObjectId,
                ref: 'users',
            },
            createdAt: String
        }
    ],
    likes: [
        {
            user: {
                type: Schema.ObjectId,
                ref: 'users'
            },
            createdAt: String
        }
    ],
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    }
}, {timestamps: true});

const Post = model('Post', postSchema);

export default Post;
