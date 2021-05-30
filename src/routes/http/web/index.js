const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => res.render("list", { layout: "main" }));
router.get("/:flightId", (req, res) => res.render("retrieve", { layout: "main" }));

module.exports = router;