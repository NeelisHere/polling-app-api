const passport = require('passport')
const UserModel = require('./models/UserModel.js')
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LocalStrategy = require('passport-local').Strategy;


passport.use('register', new LocalStrategy({
        passReqToCallback: true
    },
    async (req, x, y, done) => {
        console.info('Register verification callback')
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return done(null, false, { message: 'Invalid credentials.' })
        }
        let user = await UserModel.findOne({ username })
        if (user) {
            return done(null, false, { message: 'User already exists.' })
        }
        user = await UserModel.create({ username, email, password })
        return done(null, user)
    }
));

passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        console.info('Login verification callback')
        console.log(username, password)
        let user = await UserModel.findOne({ username }).select('-picture')
        // console.log(user)
        // if (!user) {
        //     user = await UserModel.create({ username, password })
        // }
        done(null, user)
        // done(null, false)
    }
));

passport.serializeUser((user, done) => {
    console.log('serialize')
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    console.log('deserialize')
    try {
        const user = await UserModel.findById(id).select('-picture')
        console.log(id, user)
        done(null, user)
    } catch (error) {
        console.log(error)
    }
})