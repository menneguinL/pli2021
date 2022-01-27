const db = require("../models/index.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = db.users;
const Op = db.Sequelize.Op;
const passportJWT = require('passport-jwt');
const {
    createUser,
    getUser,
    getPositionFromNMEA
} = require('../utils/user.utils')
let ExtractJwt = passportJWT.ExtractJwt;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;


// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const last_name = req.query.last_name;
    let condition = last_name ? { last_name: { [Op.like]: `%${last_name}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(req.params.id)
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

exports.addEntourage = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    if (!await getUser({id: id})) res.status(404).send({message: "Cet identifiant n'existe pas"})
    const user = getUser({id: id});
    user.entourage = req.body;
    let selector = {
        where: { id: id }
    };
    User.update(user, selector)
        .then(response => {
            res.status(200).json({message: "User updated successfully"});
        })
        .catch(err => {
            console.log(err.message);
            res.status(404).json({message: "Error while updating user "+user.identifiant});
        })
}

// Retrieve random user position
exports.setPosition = async (req, res) => {
    const id = req.params.id;
    let position = getPositionFromNMEA(req.query.data);
    if (position.lat !== null) {
        if (!await getUser({id: id})) res.status(404).send({message: "Cet identifiant n'existe pas"})
        let user = getUser({id: id});
        var selector = {
            where: { id: id }
        };
        user.position = position;
        console.log(user);
        User.update(user, selector)
            .then(response => {
                res.status(200).json({message: "User's position updated successfully"})
            })
            .catch(err => {
                res.status(404).json({message: "Error while updating user's position with id "+id})
            })
    } else {
        res.status(404).json({message: "Error while updating user's position with id "+id})
    }
};

exports.getPosition = async (req, res) => {
    const id = req.params.id;
    if (!await getUser({id: id})) res.status(404).send({message: "Cet identifiant n'existe pas"})
    let user = await getUser({id: id});
    res.status(200).send(user.position);
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const user = req.body;
    var selector = {
        where: { id: id }
    };
    User.update(user, selector)
        .then(response => {
            res.status(200).json({message: "User updated succesfully"})
        })
        .catch(err => {
            res.status(404).json({message: "Error while updating user with id "+id})
        })
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({where: {id}})
        .then(response => {
            res.status(200).json({message: "User deleted succesfully"})
        })
        .catch(err => {
            res.status(404).json({message: "Error while deleting user with id "+id})
        })
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {

};

// Login
exports.login = async (req, res) => {
    const {identifiant, password} = req.body;
    if (identifiant && password) {
        // we get the user with the name and save the resolved promise returned
        let user = await getUser({identifiant});
        if (!user) {
            return res.status(401).json({message: 'No such user found', user});
        }
        if (await bcrypt.compare(password, user.password)) {
            // from now on we’ll identify the user by the id and the id is
            // the only personalized value that goes into our token
            let payload = {id: user.id};
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            return res.json({msg: 'ok', token: token, id: user.id});
        } else {
            return res.status(401).json({message: 'Password is incorrect'});
        }
    }
};

// Register
exports.register = async (req, res) => {
    console.log("REGISTER FUNCTION")
    console.log(req.body)
    const user = { identifiant, admin } = req.body;
    user.password = await bcrypt.hash(req.body.password, 10)
    user.entourage = [];
    user.admin = user.admin? 1:0;
    if (await getUser({identifiant: user.identifiant})) res.status(404).send({message: "Cet identifiant existe déjà"})
    createUser(user)
        .then(user => {
            res.send({ user });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error while creating User"
            });
        });
};