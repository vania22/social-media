import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import User from "../database/models/User";

export const registrateUser = async (input) => {
    let {username, password, email} = input;

    // Validating if user info isn't empty
    if (!username.trim() || !password.trim() || !email.trim()) {
        throw new Error('Please provide valid details')
    }

    // Validating if email isn't taken
    email = email.toLowerCase();
    const existingUserEmail = await User.findOne({email});
    if (existingUserEmail) {
        throw new Error('User with given email already exists')
    }

    const existingUsername = await User.findOne({username});
    if (existingUsername) {
        throw new Error('User with given username already exists')
    }

    // Hashing password
    password = await bcrypt.hash(password, 10);

    // Creating user with hashed password and lowercased email
    const user = new User({
        ...input,
        email,
        password,
        createdAt: new Date().toISOString()
    });

    // Saving user to Database
    await user.save();

    // Adding JWT to send it with response
    user.token = await jwt.sign(
        {_id: user._id},
        process.env.JWTSECRET,
        {expiresIn: '1h'}
    )

    return user
}
