const express = require("express");
const app = express();
const urlRoute = require('./routes/url')
const PORT = 8001;
const {connectToMongoDb} = require('./connect')

connectToMongoDb("YOUR_CONNECTION_URL")
.then(()=>console.log("MongoDB connected"))

app.use('/url', urlRoute)

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
