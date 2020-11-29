import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../database/models/User";

export const loginUser = async (input) => {
    let {email, password} = input;

    // Validating if user info isn't empty
    if (!email.trim() || !password.trim()) {
        throw new Error('Please provide valid details')
    }

    // Searching for a user with the given email
    // and verifying if he exists
    const user = await User.findOne({email});
    if(!user) {
        throw new Error('Invalid credentials')
    }

    // Comparing passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid credentials')
    }

    // Creating JWT
    user.token = await jwt.sign(
        {_id: user._id},
        process.env.JWTSECRET,
        {expiresIn: '1h'}
    )

    return user;
}
