const mongoose = require("mongoose");
const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log(err));
};

module.exports = dbConnect;
