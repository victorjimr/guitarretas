const mongoose = require('mongoose')
const GuitarSchema = require('./schemas/guitars')

const GuitarModel = mongoose.model('guitars', GuitarSchema)

module.exports = GuitarModel