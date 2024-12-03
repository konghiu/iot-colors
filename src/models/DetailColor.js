import mongoose from "mongoose";

// const options = { timeZone: 'Asia/Ho_Chi_Minh', hour12: false };
// const formatter = new Intl.DateTimeFormat('vi-VN', {
//     ...options,
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit'
// });

const DetailColorSchema = mongoose.Schema(
    {
        classified: { type: mongoose.Schema.Types.ObjectId, ref: "Colors" },
        time: { type: Date, default: new Date() },
    },
    { timestamp: true }
);

export default mongoose.model("DetailColor", DetailColorSchema);
