const urlModels = require("../models/urlsModel")
const generateUniqueId = require("../utility/generateUniqueId")
const validateUrl = require("../utility/validateUrl")


// Create Short URL

exports.CreateShortUrl = async (req, res) => {

    try {
        const { url } = req.body
        const clientUrl = process.env.BASE_URL

        if (!validateUrl(url)) {
            res.status(400).json({ message: 'Invalid URL' })
            return
        }

        // checking if original url is already present
        const existingUrl = await urlModels.findOne({ url })
        if (existingUrl) {
            const shortUrl = `${clientUrl}/${existingUrl.shortUrlId}`
            res.status(200).json({ shortUrl: shortUrl, clicks: existingUrl.clicks })
            console.log('Url already present', shortUrl)
            return
        }

        // creating short url using nanoid
        const shortUrlId = await generateUniqueId()

        const newUrlDoc = new urlModels({
            url,
            shortUrlId,
            date: new Date()
        })
        await newUrlDoc.save()

        const shortUrl = `${clientUrl}/${shortUrlId}`
        res.status(200).json({ shortUrl: shortUrl, clicks: 0 })

    }

    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }

}

// Redirect to original URL

exports.RedirectOrginalUrl = async (req, res) => {

    try {
        const { shortUrlId } = req.params
        const urlDoc = await urlModels.findOne({ shortUrlId })
        // checking if short url is present
        if (urlDoc === null) {
            res.status(404).json({ message: 'No Url found' })
            return
        }

        // $inc increase the clicks by 1
        await urlModels.findByIdAndUpdate(urlDoc._id, { $inc: { "clicks": 1 } })
        // redirect to the original url
        return res.status(200).redirect(urlDoc.url)
    }


    catch (error) {
        console.log(err)
        res.status(500).json('Server Error')
    }
}


