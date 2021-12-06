const express = require('express')
const router = express.Router()

const Url = require('./model')
router.get('/:shortcode', async (req, res) => {
    // console.log({
    //     urlShortCode: req.params.shortcode
    // })
    try {
        // console.log("1111111")
        const url = await Url.findOne({
            urlShortCode: req.params.shortcode
        }).exec()
        // console.log(url)
        if (url) {
            // console.log(url)
            return res.redirect(url.exactUrl)
        } else {
            return res.status(404).json({err:'URL not Found'})
        }

    }
    catch (err) {
        // console.error(err)
        res.status(400).json({err: err})
    }
})


module.exports = router