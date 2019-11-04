const router = require("express").Router({ mergeParams: true });

const companyRoute = require("./company");
const subscribeRoute = require("./subdcribe");

router.use("/company", companyRoute);
router.use("/subscribe", subscribeRoute);

module.exports = router;
