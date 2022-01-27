const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();

let corsOptions = {
    origin: "http://localhost:3000"
};
dotenv.config();
app.set('view-engine', 'ejs');
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const jwt = require('jsonwebtoken');
// import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = await getUser({ id: jwt_payload.id });
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
let admin = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = await getUser({ id: jwt_payload.id });
    if (user && user.admin) {
        next(null, user);
    } else {
        next(null, false);
    }
});

// use the strategy
passport.use("jwt", strategy);
passport.use("admin", admin);
app.use(passport.initialize());

const db = require("./models/index.js");
const {
    getUser
} = require('./utils/user.utils');
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.render('index.ejs');
    /*res.send("Welcome to the app.");*/
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;

// routes
require("./routes/user.routes.js")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
