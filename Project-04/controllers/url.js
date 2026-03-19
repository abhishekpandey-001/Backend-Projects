const { nanoid } = require('nanoid');
const URL = require('../models/url')


const handleGenerateNewShortUrl = async (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json({ error: "url is required" })
    const shortId = nanoid(8)
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