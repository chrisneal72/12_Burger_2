module.exports = function (sequelize, DataTypes) {
    var Burgers = sequelize.define("burgersduex", {
        name: DataTypes.STRING,
        devoured: DataTypes.BOOLEAN
    }, {
        freezeTableName: true
    });
    return Burgers;
};