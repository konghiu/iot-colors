import mongoose from "mongoose";

const cardSchema = mongoose.Schema(
    {
        cardId: { type: String, required: true },
        username: { type: String, required: false },
        mdd: { type: Number, required: false },
        "time-in": [{ type: Date }],
        "time-out": [{ type: Date }],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Card", cardSchema);
