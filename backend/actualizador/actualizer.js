const mongoose = require('mongoose')
const Guitar = require('../models/guitars')
const cron = require("node-cron")
const delay = require('./delay')


function actualizer(){
    let guitarList = Guitar.find().exec()

    guitarList.forEach(guitar => {
        if(guitar.website === "https://www.thomann.de/es/index.html"){
            thommanComparator(guitar)
        }else if(guitar.website === "https://www.guitarristas.info"){
            guitarristasComparator(guitar)
        }
        delay(2000)
    });
}

cron.schedule("5 * * * *", () => {
    actualizer();
})