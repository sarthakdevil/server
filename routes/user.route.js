import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import  isLoggedIn  from "../middlewares/auth.middleware.js";
const router = new Router()
import {login,register,logout,getprofile,Forgetpassword,resetPassword, updateUser} from '../controller/user.controller.js'
router.post('/login',login)
router.post('/register',upload.single("avtar"),register)
router.get('/logout',logout)
router.get('/me',isLoggedIn,getprofile)
router.post('/forget-password',Forgetpassword)
router.post('/reset-password',resetPassword)
router.put('/update',isLoggedIn,updateUser)
export default router;