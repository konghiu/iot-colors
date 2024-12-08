import express from "express";
import colorsController from "../controllers/colorsController.js";
const colorsRouter = express.Router();

colorsRouter.get("/", colorsController.getColors);
colorsRouter.post("/", colorsController.postColor);
colorsRouter.delete("/", colorsController.deleteDetailColors);

colorsRouter.get("/details", colorsController.getColorDetails);
colorsRouter.delete("/detail", colorsController.deleteDetailColor);

colorsRouter.get("/quantity", colorsController.getQuantityColors);
colorsRouter.get("/quantity/:queryColor", colorsController.getQuantityColor);

export default colorsRouter;
