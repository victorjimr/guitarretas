const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const guitarSchema = new Schema ({
    url: {type: String, required: true}, //dirección de la guitarra en la web de la que se ha extraido
    name: {type: String, required: true}, //nombre de la guitarra
    price: {type: Number, required: true}, //precio
    image: {type: String, required: true}, //imagen
    description: {type: String, required: true}, //descripción del producto
    status: {type: String, required:true}, //"nueva"||"segunda mano"
    date: {type: Date, required: true, default: Date.now}, //fecha en la que se almacena en la bd para controlar variaciones en el precio
    website: {type: String},  //indica la web de donde proviene el producto
    location: {type: String, required:false}, //en caso de ser de segunda mano, dónde se encuentra el vendedor
 }, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})

module.exports = guitarSchema