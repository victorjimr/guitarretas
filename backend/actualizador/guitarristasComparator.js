const cheerio = require('cheerio')
const axios = require('axios')
const Guitar = require('../models/guitars')
const User = require('../models/users')

const mailer = require('../mailer/mailer')
const sendMail = require('../mailer/mailer')


export async function guitarristasComparator(guitar){
    let url = `https://www.guitarristas.info${guitar.url}`

    let urlResponse = await axios.get(url)

    if(urlResponse.status === 404){
        Guitar.findOneAndDelete({_id:guitar._id})
        User.find({favGuitars:guitar}).forEach(user =>{
            let subject = 'Guitarra eliminada'
            let body = `Hola ${user.firstname}. Parece ser que una guitarra de tus favoritas ha sido eliminada de la web.`
            sendMail(user.email,subject,body)
        })
    }

    let $ = cheerio.load(urlResponse.data)      
    
    let webPrice = $('div.content.item-options').find('div.price').text().trim().replace(' €', '')

    if(guitar.price > parseFloat(webPrice)){
        
        try{
            await Guitar.findOne({_id:id}, (err, foundGuitar) => {
              if(err){
                console.log(err)
                res.status(500).send()
              }
              foundGuitar.price = webPrice
              foundGuitar.save()
            })
          }catch(e){
            console.log(e)
        }
        let subject = 'Cambio de precio'
            let body = `Hola ${user.firstname}. El precio de una guitarra que tenías guardada: ${guitar.name}, ha cambiado.`
            sendMail(user.email,subject,body)
    }
}