const { Router } = require("express");
const router = Router();
const { flightsController, itinerariesController } = require("./../../../controllers/api");

router.get("/", (req, res) => flightsController.list(req, res));
router.get("/:flightId/itineraries", (req, res) => itinerariesController.list(req, res));
router.post("/", (req, res) => flightsController.create(req, res));

module.exports = router;