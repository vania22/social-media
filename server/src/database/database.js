import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })

        console.log('Successfully connected to DB')

        const {db} = mongoose.connection;

        return {
            posts: db.collection('posts')
        }
    } catch (e) {
        throw new Error('Failed connecting to Database \n' + e.message)
    }

}
