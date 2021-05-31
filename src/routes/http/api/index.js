const { Router } = require("express");
const router = Router();
const flightRoutes = require("./flight");

router.use("/flights", flightRoutes);

module.exports = router;