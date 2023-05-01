const express = require("express");
const cors = require("cors");
const config = require("./app/config");
const setupInfoRoutes = require("./app/routes/info.routes");
const setupAuthRoutes = require("./app/routes/auth.routes");
const setupReviewRoutes = require("./app/routes/review.routes");
const { BadRequestError } = require("./app/helpers/errors");
const db = require("./app/models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(config.db.url)

db.mongoose
    .connect(config.db.url)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((error) => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "You are welcome" });
});


setupInfoRoutes(app);
setupReviewRoutes(app);
setupAuthRoutes(app);

// handle 404 response
app.use((req, res, next) => {
    next(new BadRequestError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

// set port, listen for requests
const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
