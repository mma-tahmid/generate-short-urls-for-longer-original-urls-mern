

// // const { nanoid } = require('nanoid');

// const urlsModel = require('../models/urlsModel');

// module.exports = async () => {
//     const { nanoid } = await import('nanoid'); // dynamically import nanoid. require do not support nanoid
//     let urlId = nanoid(6)
//     while (true) {
//         const urlObject = await urlsModel.findOne({ urlId })
//         if (!urlObject) break;
//         urlId = nanoid(6)
//     }
//     return urlId
// }