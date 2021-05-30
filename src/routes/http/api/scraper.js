const { Router } = require("express");
const router = Router();
const { scraperController } = require("./../../../controllers/api");

router.post("/", (req, res) => scraperController.create(req, res));

module.exports = router;