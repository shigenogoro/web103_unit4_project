import express from "express"
import carsController from "../controllers/carsController.js"

const router = express.Router();

router.get('/cars', carsController.getCars);
router.get('/cars/:id', carsController.getCarById);

router.post('/cars', carsController.createCar);
router.put('/cars/:id', carsController.updateCar);

router.delete('/cars/:id', carsController.deleteCar);

export default router