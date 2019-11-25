// Dependencies
const util = require("util");
const path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    app.get("/api/start", function (req, res) {
        console.log(db.Burgers)
        try {
            db.burgersduex.findAll({
                order: [
                    ['name', 'ASC']]
            }).then(function (data) {
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
        } catch (err) {
            console.log(err);
            res.status(500).end();
        }
    });

    app.post("/api/burger", function (req, res) {
        let newBurger = req.body
        db.burgersduex.create({
            name: newBurger.name,
            devoured: false
        }).then(function (result) {
            res.json({ id: result.insertId });
        });

        res.status(204).end();
    });

    app.put("/api/burger/:id", function (req, res) {
        db.burgersduex.update(
            { devoured: true },
            { returning: true, where: { id: req.params.id } }
        ).then(function (result) {
            return res.json(result);
        });
    });

    app.delete("/api/burger/:id", function (req, res) {
        db.burgersduex.destroy({
            where: { id: req.params.id }
        }
        ).then(function (result) {
            return res.json(result);
        });
    });

    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../app/public/index.html"));
    });
};