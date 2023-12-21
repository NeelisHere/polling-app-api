const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const connectMongo = require("./connectMongo.js");
const authRoutes = require('./routes/authRoutes.js');
const MongoStore = require('connect-mongo')(session)
require('dotenv').config();
require('./passport.js')

const app = express();

app.use(cors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.set('trust proxy', 1)
app.use(session({
    name: 'auth-token',
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        // secure: false,
        maxAge: 60 * 1000,
        // sameSite: 'None'
    },
    store: new MongoStore({
        url: process.env.MONGO_URI,
        mongooseConnection: mongoose.connection,
        collection: 'sessions',
        autoRemove: 'native',
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes)




app.get('/', (req, res) => {
    res.json({ test: true })
})



app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT}`)
    connectMongo()
})