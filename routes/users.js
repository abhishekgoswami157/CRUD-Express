var User = require("../models/User");

var express = require('express');
var router = express.Router();




router.post("/", (req, res, next) => {

    User.create(req.body, (err, createdUser) => {
        if (err) return next(err);
        // res.send(req.body.name + " added successfully");
        res.redirect("/users")
    })

})
 
//render form
router.get("/new", (req, res) => {
    res.render("createUser");
})

//READ
router.get("/", (req, res, next) => {

    User.find({}, { name: 1, email: 1 }, (err, listedUsers) => {
        if (err) return next(err);
        // res.json({ users: listedUsers });
        res.render("listedUsers", {users: listedUsers});
    });
})

//READ single users
router.get("/:id", (req, res, next) => {

    User.findById(req.params.id, (err, singleUser) => {
        if (err) return next(err);
        res.render("singleUser", { user: singleUser });
    })
})


//UPDATE
router.get("/:id/edit", (req, res,next) => {
    User.findById (req.params.id, (err, updatedUser) => {
      if (err) return next(err);
      res.render("updatedUser", { user: updatedUser });
    });
})


router.post("/:id/edit", (req, res, next) => {
    console.log("entered")
    // var email = req.params.email
    // User.findOneAndUpdate({ email }, req.body, { new: true }, (err, updatedUser) => {
    //     if (err) return next(err);
    //     // res.json(updatedUser);
    //     res.redirect()
    // })
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
      if (err) return next(err);
      res.redirect("/users");
    });


})


//DELETE
router.get("/:id/delete", (req, res, next) => {

    User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
        if (err) return next(err);
        // res.send(deletedUser.name + " has been deleted");
        res.redirect("/users");
        // res.send(deletedUser.name + " has been deleted");

    })

})

module.exports = router;