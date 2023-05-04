module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            episode: {
                type: String,
                required: [true, "Episode is required"],
            },
            content: String,
            rating: Number,
            url: {
                type: String,
                required: [true, "Link anime is required"],
            },
            infoId: String,
            ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },  
        },
        { timestamps: true }
    );

    // Replace _id with id and remove __V
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("review", schema);
};
