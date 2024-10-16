import express from "express"
import carsController from "../controllers/carsController.js"
import featuresController from "../controllers/featuresController.js";

const router = express.Router();

router.get('/cars', carsController.getCars);
router.get('/cars/:id', carsController.getCarById);

router.post('/cars', carsController.createCar);
router.put('/cars/:id', carsController.updateCar);

router.delete('/cars/:id', carsController.deleteCar);

// Exteriors
router.get('/exteriors', featuresController.getAllExteriors);
router.get('/exteriors/:id', featuresController.getExteriorById);

// Roofs
router.get('/roofs', featuresController.getAllRoofs);
router.get('/roofs/:id', featuresController.getRoofById);

// Wheels
router.get('/wheels', featuresController.getAllWheels);
router.get('/wheels/:id', featuresController.getWheelById);

// Interiors
router.get('/interiors', featuresController.getAllInteriors);
router.get('/interiors/:id', featuresController.getInteriorById);

export default router