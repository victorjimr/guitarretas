const nodemailer = require(nodemailer)
const config = require('../config')


class Mailer {
    constructor(){
        this.transporter = null
    }
}

function initialize(){
    this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: config.mailAuth.user,
            pass: config.mailAuth.pass
        }
    })
};

async function send(to, subject, body, asHTMLBody = true){
    if(!this.testAccount || ! this.transporter){
        await this.initialize()
      }
      
    let emailItem = {
        from: 'guitarretaspuntocom@gmail.com',
        to: to,
        subject: subject
    }
    if(asHTMLBody){
        emailItem.html = body
      }
  
      if(!asHTMLBody){
        emailItem.text = body
      }

      let transporterResponse = await this.transporter.sendMail(emailItem)
}

let mailer = new Mailer()

module.exports = new Mailer()
module.exports = send