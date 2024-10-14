import mongoose from "mongoose";

const ConnectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "PORTFOLIO"
    }).then(() => {
        console.log("Connected Successfully");
    }).catch((err) => {
        console.log(`Some error occured wgile connected to database ${err}`);
    });
}

export default ConnectDB;