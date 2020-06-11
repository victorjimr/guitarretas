const cheerio = require('cheerio')
const axios = require('axios')
const Guitar = require('../models/guitars')
const mongoose = require('mongoose')

async function guitarristasComparator(guitar){
    let url = guitar.url

    let urlResponse = await axios.get(url)

    if(urlResponse.status === 404){
        Guitar.findOneAndDelete(guitar._id)
    }

    let $ = cheerio.load(urlResponse.data)      
    
    let webPrice = $('div.content.item-options').find('div.price').text().trim().replace(' €', '')

    if(guitar.price > parseFloat(webPrice)){
        sendEmail(guitar)
       
        Guitar.findByIdAndUpdate(guitar._id, ({price: webPrice}))
    }

}