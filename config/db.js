const mongoose = require("mongoose");
const url = "mongodb://RemaxAdmin:RemaxAdminTechfye2202@127.0.0.1:27017/Remax?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
ConnectToMongo = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });
};

module.exports = ConnectToMongo;
