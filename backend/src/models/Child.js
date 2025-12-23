const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
    {
        parent: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Parent",
            required: true,
            index: true
        },

        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30
        },

        age: {
            type: Number,
            required: true,
            min: 2,
            max: 9
        },

        avatar: {
            type: String, // optional (URL or asset name)
            default: null
        },

        level: {
            type: Number,
            default: 1
        },

        xp: {
            type: Number,
            default: 0
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Child", childSchema);
