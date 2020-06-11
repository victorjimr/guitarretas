const cheerio = require('cheerio')
const axios = require('axios')
const Guitar = require('../models/guitars')
const mongoose = require('mongoose')

async function thommanComparator(guitar){
    let url = guitar.url

    let urlResponse = await axios.get(url)

    if(urlResponse.status === 404){
        Guitar.findOneAndDelete(guitar._id)
    }

    let $ = cheerio.load(urlResponse.data)      
    
    let webPrice = $('div.prod-pricebox-price-primary').find('span.primary').text().trim().replace(' €', '')

    if(guitar.price > parseFloat(webPrice)){
        sendEmail(guitar)
       
        Guitar.findByIdAndUpdate(guitar._id, ({price: webPrice}))
    }

}