const { Router } = require("express");
const router = Router();
const { flightController } = require("./../../../controllers/api");

router.get("/", (req, res) => flightController.list(req, res));
router.get("/:flightId", (req, res) => flightController.retrieve(req, res));

module.exports = router;