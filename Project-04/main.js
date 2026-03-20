const express = require("express");
const app = express();
const urlRoute = require('./routes/url')
const URL = require('./models/url')
const PORT = 8001;
const { connectToMongoDb } = require('./connect')

app.use(express.json())

connectToMongoDb("YOUR_CONNECTION_URL")
    .then(() => console.log("MongoDB connected"))

app.use('/url', urlRoute)

app.get('/:shortId', async (req, res)=>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push :{visitHistory: {
        timestamp: Date.now()
    }}})
    res.redirect(entry.redirectUrl)
})

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
