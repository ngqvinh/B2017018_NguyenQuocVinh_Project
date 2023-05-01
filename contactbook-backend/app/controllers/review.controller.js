const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const Review = db.Review;

exports.create = async (req, res, next) => {
    if (!req.body.infoId) {
        return next(new BadRequestError(400, "Chưa thêm phim này."));
    }
    const review = new Review({
        episode: req.body.episode,
        content: req.body.content,
        rating: req.body.rating,
        url: req.body.url,
        infoId: req.body.infoId,
        ownerId: req.userId,
    });
    const [error, document] = await handle(review.save());
    if (error) {
        return next(
            new BadRequestError(
                500,
                "Create error."
            )
        );
    }

    return res.send(document);
};

exports.update = async (req, res, next) => {
    if (!req.body) {
        return next(
            new BadRequestError(400, "Update error.")
        );
    }
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };
    const [error, document] = await handle(
        Review.findOneAndUpdate(condition, req.body, {
            new: true,
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(
                500,
                `update error id=${req.params.id}`
            )
        );
    }
    if (!document) {
        return next(new BadRequestError(404, "The review is not exist."));
    }
    return res.send({ message: "Updated" });
};

exports.delete = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    };
    const [error, document] = await handle(
        Review.findOneAndDelete(condition, {
        projection: "-ownerId",
        })
    );
    if (error) {
        return next(
            new BadRequestError(
                500,
                `Can not delete id=${req.params.id}`
            )
        );
    }
    if (!document) {
        return next(new BadRequestError(404, "The review is not exist."));
    }

    return res.send({ message: "Deleted" });
};

exports.findAll = async (req, res, next) => {
    const [error, documents] = await handle(
        Review.find(
            {
                infoId: req.params.id,
            },
        )
    );
    console.log(req.params.id);
    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving testId=${req.params.id}`
            )
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    const condition = {
        _id: req.params.id,
    };

    const [error, document] = await handle(
        Review.findOne(condition)
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving Review with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Review not found"));
    }

    return res.send(document);
};