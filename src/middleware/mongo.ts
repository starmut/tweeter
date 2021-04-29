import mongoose from 'mongoose';
import {NextApiHandler} from "next";

const connectDB = (handler: NextApiHandler): NextApiHandler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGO_URI!, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true
    });

    return handler(req, res);
};

export default connectDB;
