import Colors from "../models/Colors.js";
import DetailColor from "../models/DetailColor.js";

const colorsBasic = { red: true, green: true, blue: true };

const colorsController = {
    getColors: async (req, res) => {
        try {
            const getColors = await Colors.find({});
            res.status(200).send(getColors);
        } catch (err) {
            res.status(403).send({
                message: err.message,
            });
        }
    },
    getColorDetails: async (req, res) => {
        let { from, to } = req.query;
        to = new Date(to);
        to.setDate(to.getDate() + 1);
        try {
            const colorDetails = await DetailColor.find({
                time: {
                    $gte: from,
                    $lte: to,
                },
            }).populate("classified");
            res.status(200).send(colorDetails);
        } catch (err) {
            res.status(403).send({
                message: err.message,
            });
        }
    },
    getQuantityColors: async (req, res) => {
        try {
            const getColors = await Colors.find({});
            const data = {};
            getColors.forEach((col) => {
                data[col.classify.toLowerCase()] = col.quantity;
            });

            res.status(200).send(data);
        } catch (err) {
            res.status(403).send({
                message: err.message,
            });
        }
    },
    getQuantityColor: async (req, res) => {
        let { queryColor } = req.params;
        try {
            queryColor = queryColor.toUpperCase();
            const color = await Colors.findOne({ classify: queryColor });
            res.status(200).send({ quantity: color.quantity });
        } catch (err) {
            res.status(404).send({ message: `NOT FOUND '${queryColor}'` });
        }
    },
    postColor: async (req, res) => {
        let color = req.body.color;

        if (!colorsBasic[color.toLowerCase()]) color = "OTHERS";
        else color = color.toUpperCase();

        try {
            const ExistColor = await Colors.findOne({ classify: color });
            if (ExistColor) {
                const newDetailColor = new DetailColor({
                    classified: ExistColor._id,
                    time: new Date.now(),
                });
                ExistColor.quantity += 1;
                await ExistColor.save();
                await newDetailColor.save();
                res.status(201).send("The color is exist!");
            } else {
                const newColor = new Colors({ classify: color });
                const newDetailColor = new DetailColor({
                    classified: newColor._id,
                    time: new Date.now(),
                });
                await newColor.save();
                await newDetailColor.save();
                res.status(200).send(
                    "The color is created and appended successful!"
                );
            }
        } catch (err) {
            res.status(500).send("errors! in COLORs");
        }
    },

    deleteDetailColor: async (req, res) => {
        const id = req.body.id;
        try {
            let detail = await DetailColor.findOneAndDelete({ _id: id });
            if (detail) {
                const color = await Colors.findOne({ _id: detail.classified });
                color.quantity -= 1;
                await color.save();
                res.status(200).send({
                    message: "This COLOR have been completely deleted",
                });
            } else {
                res.status(200).send({
                    message: "This COLOR may have been deleted previously!",
                });
            }
        } catch (err) {
            res.status(403).send({
                message: err.message,
            });
        }
    },

    deleteDetailColors: async (req, res) => {
        const id = req.body.id;
        try {
            const color = await Colors.findOne({ _id: id });
            if (color) {
                color.quantity = 0;
                await DetailColor.deleteMany({ classified: id });
                await color.save();
                res.status(200).send({
                    message:
                        "All these color detail have been completely deleted!",
                });
            } else {
                res.status(204).send({
                    message: "This COLOR isn't created yet.",
                });
            }
        } catch (err) {
            res.status(403).send({
                message: err.message,
            });
        }
    },
};

export default colorsController;
