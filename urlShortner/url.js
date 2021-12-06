const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')
var baseUrl = require('../config/variable.js')
const router = express.Router()

const Url = require('./model.js')

baseUrl = baseUrl.baseUrl

module.exports = async (req, res) => {
    const {
        urlToConvert
    } = req.body

    // console.log(urlToConvert)
    if(!urlToConvert){ 
        res.status(400).json({err:"incorrect parameters are provides use urlToCOnvert"})
    }

    if (validUrl.isUri(urlToConvert)) {
        // console.log({
        //     exactUrl: urlToConvert
        // })
        try {
            let url = await Url.findOne({
                exactUrl: urlToConvert
            }).exec()

            // console.log(url)
            
            if (url) {
                res.status(200).json(url)
            } else {
                
                var _ = shortid.generate()
                var shortUrl = baseUrl + '/' + _

                // console.log({
                //     urlToConvert,
                //     _,
                //     date: new Date()
                // })

                //putting all the details in the db
                url = new Url({
                    exactUrl :urlToConvert,
                    urlShortCode:_,
                    shortUrl: shortUrl,
                    date: new Date()
                })
                await url.save()
                res.status(200).json(url)
            }
        }
        catch (err) {
            // console.log(err)
            res.status(400).json({
                err: err
            })
        }
    } else {
        res.status(400).json({
            err: "URL provided is invalid, pls chck"
        })
    }
}

