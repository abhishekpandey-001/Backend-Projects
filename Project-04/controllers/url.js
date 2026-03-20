const URL = require('../models/url');
const shortid = require('shortid');


const handleGenerateNewShortUrl = async (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json({ error: "url is required" })
    const shortId = shortid()
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    })

    return res.status(200).json({ id: shortId })
}


module.exports = {
    handleGenerateNewShortUrl,
}