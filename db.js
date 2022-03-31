const mongoose = require('mongoose');
const mongoUri = "mongodb+srv://memories-react:123@cluster0.tiyeq.mongodb.net/ServerSidePagination?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongoUri, () => {
        console.log("Connected to Mongo");
    });
}

module.exports = connectToMongo;