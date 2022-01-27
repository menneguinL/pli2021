module.exports = app => {
    const passport = require('passport');
    const users = require("../controllers/user.controller.js");
    let router = require("express").Router();
    const auth = passport.authenticate('jwt', { session: false });
    const authAdmin = passport.authenticate('admin', { session: false });

    // Login
    router.post("/login", users.login);

    // Register
    router.post("/register", users.register);

    // Add family mumber of a user
    router.post("/entourage/:id", users.addEntourage);

    // Retrieve all users
    router.get("/", authAdmin, users.findAll);

    // Retrieve a single user with id
    router.get("/:id", users.findOne);

    // Retrieve the position of a user
    router.get("/setPosition/:id", users.setPosition);
    router.get("/getPosition/:id", users.getPosition);

    // Update a user with id
    router.put("/:id", authAdmin, users.update);

    // Delete a user with id
    router.delete("/:id", authAdmin, users.delete);

    // Delete all users
    router.delete("/", authAdmin, users.deleteAll);

    app.use('/api/users', router);
};
