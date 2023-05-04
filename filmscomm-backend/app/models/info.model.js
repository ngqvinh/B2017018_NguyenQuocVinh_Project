module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            title: {
                type: String,
                required: [true, "Title is required"],
            },
            illustrator: String,
            nation: String,
            type: String,
            num_episodes: String,
            vietsub: Boolean,
            compendious: String,
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

    return mongoose.model("info", schema);
};
