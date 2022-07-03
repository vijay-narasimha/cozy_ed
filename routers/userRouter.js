const express=require('express')
const authController=require('../controllers/authController')

const Router=express.Router()

Router.post('/signup',authController.signup)
Router.post('/login',authController.login)
Router.get('/logout',authController.logout)
Router.post('/forgotpassword',authController.forgotPassword)
Router.post('/resetpassword/:token',authController.resetPassword)

module.exports=Router;