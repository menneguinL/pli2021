const db = require("../models/index.js");
const User = db.users;
const nmea = require('@drivetech/node-nmea');

const createUser = async (object) => {
    return await User.create(object);
};

const getAllUsers = async () => {
    return await User.findAll();
};

const getUser = async obj => {
    return await User.findOne({
        where: obj,
    });
};

const generateRandomNumber = (min, max) => {
        return Math.random() * (max - min) + min;
};

const getPositionFromNMEA = (string) => {
    let splited = string.split("$");
    let parsed  = "";

    for (let i = 0; i < splited.length; i++) {
        if (splited[i].includes("GPRMC")) {
            parsed = splited[i];
        }
    }
    const data = nmea.parse("$" + parsed);
    return {
        "lat": data.loc.dmm.latitude || null,
        "lng": data.loc.dmm.latitude || null
    }
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    generateRandomNumber,
    getPositionFromNMEA
}