import { config } from 'dotenv';
import { connect as mongooseConnect, connection } from 'mongoose';


config()
export const connectDB = async (): Promise<void> => {
    await mongooseConnect(process.env.MONGOURL);
};

export const closeDB = (): Promise<void> => connection.close();