// Dependencies
var Burgers = require("../models/burgers.js");

// Routes
// =============================================================
module.exports = function (app) {
    app.get("/", function (req, res) {
        Burgers.findAll().then(function (data) {
            let burgers = [];
            let devBurgers = [];
            data.forEach(function (currentValue) {
                if (currentValue.devoured) {
                    devBurgers.push(currentValue);
                } else {
                    burgers.push(currentValue);
                }
            });
            var hbsObject = {
                burger: burgers,
                devoured: devBurgers
            };
            res.render("burger_lists", hbsObject);
        });
    });

    app.post("/api/burger", function (req, res) {
        let newBurger = req.body
        Burgers.create({
            name: newBurger.name,
            devoured: false
        }).then(function (result) {
            res.json({ id: result.insertId });
        });

        res.status(204).end();
    });

    app.put("/api/burger/:id", function (req, res) {
        Burgers.update(
            { devoured: true },
            { returning: true, where: { id: req.params.id } }
        ).then(function (result) {
            return res.json(result);
        });
    });

    app.delete("/api/burger/:id", function (req, res) {
        Burgers.destroy({
            where: { id: req.params.id }
        }
        ).then(function (result) {
            return res.json(result);
        });
    });
};