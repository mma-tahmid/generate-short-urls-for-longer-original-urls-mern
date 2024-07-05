const mongoose = require("mongoose")

const urlsSchema = new mongoose.Schema(
    {
        urlId: { type: String, required: true }, // unique Id
        originalUrl: { type: String, required: true },
        shortUrl: { type: String, required: true },
        clicks: { type: Number, required: true, default: 0 },
        date: { type: String, default: Date.now }
    }
);

// model
const urlModel = mongoose.model("urls", urlsSchema);
module.exports = urlModel;


// const mongoose = require("mongoose")

// const urlsSchema = new mongoose.Schema(
//     {
//         // trim remove white space in letter
//         url: { type: String, required: true },
//         shortUrlId: { type: String, required: true },
//         clicks: { type: Number, required: true, default: 0 },
//         date: { type: Date, required: true },
//     },

//     { timestamps: true, versionKey: false }
// );

// // model
// const urlModel = mongoose.model("urls", urlsSchema);
// module.exports = urlModel;