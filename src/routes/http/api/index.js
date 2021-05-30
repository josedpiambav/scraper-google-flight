const { Router } = require("express");
const router = Router();
const scraperRoutes = require("./scraper");
const flightRoutes = require("./flight");

router.use("/scraper", scraperRoutes);
router.use("/flights", flightRoutes);

module.exports = router;