module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        identifiant: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        admin: {
            type: Sequelize.BOOLEAN
        },
        entourage: {
            type: Sequelize.JSON
        },
        position: {
            type: Sequelize.JSON
        }
    });
    return User;
};
