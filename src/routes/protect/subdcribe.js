const router = require("express").Router({ mergeParams: true });
const subscribeController = require("../../controllers/subscribe");

router.post("", subscribeController.add);
router.post("/push", subscribeController.push);

module.exports = router;
