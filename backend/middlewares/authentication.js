'use strict'

const config = require('../config')
const jwt = require('jsonwebtoken')
const defaultUserProfile = 'user'

//ejemplos de llamada al middleware configurable
//authenticationVerify('admin',true)
//authenticationVerify(['admin'],true)
//authenticationVerify(['admin', 'moderator'],true)
//authenticationVerify(['admin', 'moderator'])

function authenticationVerify(allowedProfiles, authRequired = true) {
  return (req, res, next) => {
    //el middleware guarda la informaicón del usuario logado en la petición para ser usada DESPUÉS POR LA APP
    req.user = null

    if (!authRequired && !req.token) {
      next()
      return
    }

    if (!req.token) {
      res.status(401).json({ 'message': 'Debes estar autenticado para usar este método' })
      return
    }

    jwt.verify(req.token, config.APP_SECRET, (err, tokenData) => {

      if (err) {
        console.info(err)
        res.status(401).json({ 'message': 'La sesión ha sido cerrado. Identifícate de nuevo.' })
        return
      }

      let userProfile = tokenData.profile || defaultUserProfile

      if (!isAllowedProfile(userProfile, allowedProfiles)) {
        res.status(403).json({ 'message': 'No tienes permisos suficientes' })
        return
      }

      //guarda la información del token en
      req.user = tokenData

      next()
    })
  }
}

function isAllowedProfile(current, alloweds) {
  if (typeof alloweds === 'string') {
    alloweds = [alloweds]
  }

  //si el perfil recibido esta entre los permitidos devuelve true (false en caso contrario al ser la respuesta más restrictiva)
  return (alloweds.indexOf(current) !== -1) ? true : false
}


module.exports = authenticationVerify