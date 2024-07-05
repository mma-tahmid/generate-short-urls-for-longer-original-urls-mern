const express = require("express");


const urlControllers = require("../controllers/urlController")

const router = express.Router();

router.post("/create-short-url", urlControllers.CreateShortUrl)

router.get('/redirect-original-url/:sixdigiturlcode', urlControllers.RedirectOrginalUrl)

// get all saved urls
router.get('/all-urls', urlControllers.GetAllUrls) 



module.exports = router;