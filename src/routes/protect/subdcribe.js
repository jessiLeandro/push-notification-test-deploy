const router = require("express").Router({ mergeParams: true });
const subscribeController = require("../../controllers/subscribe");

router.post("", subscribeController.add);

module.exports = router;
