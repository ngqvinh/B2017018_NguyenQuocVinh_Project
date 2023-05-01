const mongoose = require("mongoose");
const createUserModel = require("./user.model");
const creatInfoModel = require("./info.model");
const creatReviewModel = require("./review.model");
const db = {};

db.mongoose = mongoose;
db.User = createUserModel(mongoose);
db.Info = creatInfoModel(mongoose);
db.Review = creatReviewModel(mongoose);

module.exports = db;
