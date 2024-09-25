import mongoose from "mongoose";

const FontSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    className: {
        type: String,
    },
    style: {
        fontFamily: {
            type: String,
        },
        fontStyle: {
            type: String,
        },
    },
});

const Font = mongoose.models.Font || mongoose.model("Font", FontSchema);

export default Font;
