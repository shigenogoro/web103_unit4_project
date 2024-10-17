import express from 'express'

import CarsController from "../controllers/cars.js";
import OptionsController from "../controllers/options.js";

const router = express.Router()

router.get("/cars", CarsController.getCars);
router.get("/cars/:id", CarsController.getCarById);

router.post("/cars", CarsController.createCar);
router.post("/cars/:id", CarsController.updateCar);

router.delete("/cars/:id", CarsController.deleteCar);

router.get("/exteriors", OptionsController.getAllExteriors);
router.get("/exteriors/:id", OptionsController.getExteriorById);

router.get("/roofs", OptionsController.getAllRoofs);
router.get("/roofs/:id", OptionsController.getRoofById);

router.get("/wheels", OptionsController.getAllWheels);
router.get("/wheels/:id", OptionsController.getWheelById);

router.get("/interiors", OptionsController.getAllInteriors);
router.get("/interiors/:id", OptionsController.getInteriorById);

export default router;
