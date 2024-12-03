import mongoose from "mongoose";

const colorsSchema = mongoose.Schema({
    classify: { type: String, required: true, unique: true },
    quantity: { type: Number, default: 1 },
});

export default mongoose.model("Colors", colorsSchema);
