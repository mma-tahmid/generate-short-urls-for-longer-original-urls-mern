const urlModels = require("../models/urlsModel")
const ShortUniqueId = require('short-unique-id');
const { validateUrl } = require("../utility/validateUrl");

// Create Short Url

exports.CreateShortUrl = async (req, res) => {

    try {

        const { originalUrl } = req.body;

        //console.log("Received URL:", originalUrl); // Debug log

        const base = `http://localhost:8000`


        if (!validateUrl(originalUrl)) {
            return res.status(400).send({ message: 'Invalid URL' })

        }

        // // creating short url 6digit code using short-unique-id package

        const uid = new ShortUniqueId({ length: 6 }); // This will print a 6-character unique ID

        let urlId = uid.rnd();

        // checking if original url is already present
        const existingOriginalUrl = await urlModels.findOne({ originalUrl })

        if (existingOriginalUrl) {
            const shortUrl = `${base}/${existingOriginalUrl.urlId}`
            res.status(200).json({ shortUrl: shortUrl, clicks: existingOriginalUrl.clicks })
            console.log('Url already present', shortUrl)
            return
        }


        const shortUrls = `${base}/${urlId}`;

        const newUrl = await new urlModels({
            originalUrl,
            shortUrl: shortUrls,
            urlId,
            date: new Date(),
        }).save();

        res.status(201).send({
            success: true,
            message: "Short Url Created Successfully",
            output: newUrl
        })

    }

    catch (error) {
        console.log(error)
        res.status(400).json('Something went wrong');
    }
}





// ////////



// Create Short URL



// // Redirect to original URL

exports.RedirectOrginalUrl = async (req, res) => {

    try {
        const sixDigitUrlCode = req.params.sixdigiturlcode

        const urlDoc = await urlModels.findOne({ urlId: sixDigitUrlCode })
        //console.log(urlDoc)

        // checking if short url is present
        if (urlDoc === null) {
            return res.status(404).send({ message: 'No Url found' })

        }

        // $inc increase the clicks by 1
        await urlModels.findByIdAndUpdate(urlDoc._id, { $inc: { "clicks": 1 } })
        // redirect to the original url
        return res.status(200).redirect(urlDoc.originalUrl)
    }


    catch (error) {
        console.log(error)
        res.status(500).json('Error While Redirect to Original Url')
    }
}

// Get All Urls

exports.GetAllUrls = async (req, res) => {

    try {
        const getAllUrlss = await urlModels.find({})

        res.status(201).send({
            success: true,
            message: "All urls",
            output: getAllUrlss,

        })
    }

    catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in Getting all Urls",
            error: error.message

        })
    }
}


