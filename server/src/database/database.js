import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        console.log('Connected to Database')
    } catch (e) {
        throw new Error('Failed connecting to Database \n' + e.message)
    }

}
