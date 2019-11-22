// Dependencies
var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Burgers = sequelize.define("burgersDuex", {
    name: Sequelize.STRING,
    devoured: Sequelize.BOOLEAN
}, {
    freezeTableName: true
});

// Syncs with DB
Burgers.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = Burgers;