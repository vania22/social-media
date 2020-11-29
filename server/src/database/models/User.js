import {model, Schema} from 'mongoose';

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
}, {timestamps: true});

const User = model('User', userSchema);

export default User;
