const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Info = db.Info;

// Create and Save a new Info
exports.create = async (req, res, next) => {
    // Validate request
    if (!req.body.title) {
        return next(new BadRequestError(400, "title can not be empty"));
    }

    // Create a Info
    const info = new Info({
        title: req.body.title,
        illustrator: req.body.illustrator,
        nation: req.body.nation,
        type: req.body.type,
        num_episodes: req.body.num_episodes,
        vietsub: String(req.body.vietsub).toLowerCase() === "true",
        compendious: req.body.compendious,
        ownerId: req.userId,
    });

    // Save Info in the database
    const [error, document] = await handle(info.save());

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while creating the Info"
            )
        );
    }

    return res.send(document);
};

// Retrieve all Infos of a user from the database
exports.findAll = async (req, res, next) => {
    const condition = { };
    const title = req.query.title;
    if (title) {
        condition.title = { $regex: new RegExp(title), $options: "i" };
    }

    const [error, documents] = await handle(
       Info.find(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while retrieving Infos"
            )
        );
    }

    return res.send(documents);
};

// Find a single Info with an id
exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
    };

    const [error, document] = await handle(
        Info.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving Info with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Info not found"));
    }

    return res.send(document);
};

// Update a Info by the id in the request
exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Data to update can not be empty")
        );
    }

    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Info.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error updating Info with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Info not found"));
    }

    return res.send({ message: "Info was updated successfully" });
};

// Delete a Info with the specified id in the request
exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };

    const [error, document] = await handle(
        Info.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Could not delete Info with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Info not found"));
    }

    return res.send({ message: "Info was deleted successfully" });
};

// Delete all Infos of a user from the database
exports.deleteAll = async (req, res, next) => {
    const [error, data] = await handle(
        Info.deleteMany({ ownerId: req.userId })
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                "An error occurred while removing all Infos"
            )
        );
    }

    return res.send({
        message: `${data.deletedCount} Infos were deleted successfully`,
    });
};

