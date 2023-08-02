const express = require('express');
const {  addUsers, getUsers, DeleteUsers, login, logout, getLoginUsers } = require('../controllers/loginControler');
const { validateRegister, isDeviseID, isBrowserID, idRagesterValidatorError } = require('../middleware/peopleValidators');
const { validateLogin, idLoginValidatorError, checkDeviceId, checkBrowserId } = require('../middleware/loginValidators');
const { isLoginUser } = require('../middleware/common/authGard');
const { mobileLogin, mobileOTPVarify } = require('../controllers/otpControler');
const routers=express.Router()






routers.get("/getUsers",isLoginUser,checkDeviceId, checkBrowserId , getUsers)
routers.get("/getLoginUsers",isLoginUser,checkDeviceId, checkBrowserId , getLoginUsers  )
routers.post("/login",validateLogin, idLoginValidatorError,checkDeviceId, checkBrowserId, login)
routers.post("/regester",validateRegister,idRagesterValidatorError, isDeviseID,isBrowserID, addUsers)
routers.post("/otp/login",isLoginUser,mobileLogin)
routers.post("/otp/varify",isLoginUser,mobileOTPVarify)
routers.delete("/deleteUser", DeleteUsers)
routers.delete("/logout", logout)

module.exports=routers;