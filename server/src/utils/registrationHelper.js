import bcrypt from 'bcryptjs'

import User from "../database/models/User";

export const registrateUser = async (input) => {
    let {username, password, email} = input;

    // Validating if user info isn't empty
    if(!username.trim() || !password.trim() || !email.trim()) {
        throw new Error('Please provide valid details')
    }

    // Validating if email isn't taken
    const existingUser = await User.findOne({email});
    if(existingUser) {
        throw new Error('User with given email already exists')
    }

    // Hashing password
    password = await bcrypt.hash(password, 10);

    // Saving user
    const user = new User({...input, password});
    await user.save();

    return user
}
