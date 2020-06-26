const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { json } = require("express")
const jwt = require("jsonwebtoken")
const firebase = require("firebase")
const bearerToken = require("express-bearer-token")
const config = require('./config')
const User = require('./models/users')
const Guitar = require('./models/guitars')
const { ObjectId } = require('mongoose')
const authMiddleware = require('./middlewares/authentication')

require('./actualizador/actualizer')

const PORT = process.env.PORT || 3000
const JWT_PASSWORD = config.secret
const mongoUri = config.mongoConfig

const app = express()

const firebaseParameters = config.firebaseConfig

firebase.initializeApp(firebaseParameters)

app.use(json())
app.use(cors())
app.use(bearerToken())

const methodAllowedForUsersAndAdmins = authMiddleware(['user', 'admin'], true)


async function checkEmailAndPassword(email, pass) {
  try{
  let auth = await firebase.auth().signInWithEmailAndPassword(email, pass);
  return auth;
  }catch(e){
    console.log(e)
  }
}

//Rutas de usuario --------------------------

app.post("/user", async(req, res) =>{

  let token = req.body.token
  let data = await jwt.verify(token, JWT_PASSWORD)

  let user = await User.findById(data.dbid).exec()

    if (!user) {
      console.info(searchId, "No encontrado")
      res.status(404).json({ 'message': 'Usuario no encontrado' })
      return
    }
    res.json({user})
})

app.put("/user", async (req, res)=>{
  let userData = req.body
  let id = userData._id
  try{
    await User.findOne({_id:id}, (err, foundUser) => {
      if(err){
        console.log(err)
        res.status(500).send()
      }else {
        if(!foundUser){
          res.status(404).send()
        }else{
          if(userData.favGuitars){
            foundUser.favGuitars = userData.favGuitars
          }
          foundUser.save((err, updatedUser)=>{
            if(err){
              console.log(err)
              res.status(500).send()
            }else{
              res.send(updatedUser)
            }
          })
        }
      }
    })

  }catch(e){
    console.log(e)
  }
  
})


//Rutas de guitarras ------------------

app.get("/guitars", async (req, res)=>{
  let guitars = await Guitar.find()
  res.json({guitars})
})

app.get('/guitars/:id', async(req,res)=>{
  let id = req.params.id.replace(':','').trim()
  let guitar = await Guitar.findById(id).exec()

  if (!guitar) {
    res.status(404).json({ 'message': 'El elemento que intentas obtener no existe' })
    return
  }

  res.json({guitar})

})

//---------------------------- Register $ Login --------------------

app.post("/register", async (req,res)=>{

    let userData = req.body

    await new User({
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        profile: 'user'
    }).save()
})

app.post("/login", async(req, res) => {

  let credentials = req.body

  let user = await User.findOne({email:credentials.email}).exec()

  try{
  let auth = await checkEmailAndPassword(credentials.email, credentials.password)
    let payload = {
      dbid: user._id,
      id: auth.user.uid,
      email: credentials.email
    }

    let token = jwt.sign(payload, JWT_PASSWORD, {expiresIn: 86400});
    res.json({ token, user});
 
  }catch (e) {
  res.status(401).json({ message: e.message });
  }
})

async function connectDatabase() {
  
    let uri = mongoUri

    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log("Imposible conectar a la base de datos");
      console.log(err);
    }
  }

async function init(){
    await connectDatabase()
    app.listen(PORT, () => console.log(`Conectado al puerto ${PORT}`));
}

init()