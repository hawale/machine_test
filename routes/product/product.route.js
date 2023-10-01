const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product.controllers");
const passport = require("passport");

const authenticate = (req, res, next) => {
    console.log("reqqq")
    console.log("reqqq",req)
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
router.get(
  "/",
  (req, res, next) => {
    authenticate(req, res, next);
  },
  productController.productList
);

module.exports = router;
