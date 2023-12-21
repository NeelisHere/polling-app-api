const passport  = require('passport');

class AuthController {
    async loginSuccess(req, res) {
        console.log('login-success')
        res.json({
            success: true,
            user: req.user
        })
    }
    async loginFailure(req, res) {
        console.log('login-failure')
        res.json({
            success: false,
            message: 'Login failed.'
        })
    }
    async register(req, res, next) {
        const registerAuth = passport.authenticate('register', (err, user, info) => {
            console.log(err, user)
            if (!user) {
                return res.status(401).json({ 
                    success: false, 
                    message: info.message 
                });
            }
            req.logIn(user, (err) => {
                if (err) return next(err);
                res.redirect('/auth/register/success')
            })
        })
        registerAuth(req, res, next)
    }
    async registrationSuccess(req, res) {
        console.log('registration-success')
        res.json({
            success: true,
            user: req.user
        })
    }
    async registrationFailure(req, res) {
        console.log('registration-failure')
        res.json({
            success: false,
            message: 'User already registered.'
        })
    }
}

module.exports = new AuthController();