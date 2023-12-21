const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController.js');

const router = express.Router()

router.post('/register', authController.register)
router.get('/register/success', authController.registrationSuccess)
router.get('/register/failure', authController.registrationFailure)


router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/login/success',
        failureRedirect: '/auth/login/failure' 
    }),
)
router.get('/login/success', authController.loginSuccess)
router.get('/login/failure', authController.loginFailure)


module.exports = router;