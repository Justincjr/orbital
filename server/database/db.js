import mongoose from "mongoose";

export default async function connect() {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Database Connected");
    } catch (error) {
        console.error("Could not connect to the database", error);
    }
}
