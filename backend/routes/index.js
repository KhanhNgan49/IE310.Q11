const express = require("express");
const router = express.Router();

const userRoutes = require("../api/user.route");
const medicalFacilityRoutes = require("../api/medical_facility.route");
const outbreakRoutes = require("../api/outbreak_area.route");

router.use("/users", userRoutes);
router.use("/medical-facilities", medicalFacilityRoutes);
router.use("/outbreak-areas", outbreakRoutes);


module.exports = router;
