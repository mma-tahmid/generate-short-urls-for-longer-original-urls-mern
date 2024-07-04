const express = require("express");


const urlControllers = require("../controllers/urlController")

const router = express.Router();

router.post("/create-short-url", urlControllers.CreateShortUrl)

router.get('/redirect-original-url/:shortUrlId', urlControllers.RedirectOrginalUrl)


module.exports = router;