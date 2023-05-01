const express = require("express");
const review = require("../controllers/review.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();
    
    router.get("/:id", review.findAll);
    router.use(middlewares.verifyToken);
    router.post("/:id", review.create);
    router.get("/getone/:id", review.findOne);
    router.put("/:id", review.update);
    router.delete("/:id", review.delete);

    app.use("/api/reviews", router);
};
