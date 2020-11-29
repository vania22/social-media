import jwt from 'jsonwebtoken'
import {AuthenticationError} from 'apollo-server';

import User from "../database/models/User";

// If JWT token is valid - returns a user
export const isAuthenticated = async (req) => {

    // Get Authorization header
    const Authorization = req.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')

        try {
            // Verify that token isn't expired, and decoding user _id
            // If token is expired jwt.verify will throw an error
            const {_id} = jwt.verify(token, process.env.JWTSECRET)

            // Verifying if decoded _id matches a user in Database
            const user = await User.findById(_id);
            if (!user) {
                throw new AuthenticationError('Not authorized')
            }

            return user
        } catch (e) {
            throw new AuthenticationError('Invalid/expired token')
        }
    }

    throw new AuthenticationError('Invalid/expired token')
}
