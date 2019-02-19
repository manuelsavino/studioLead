const router = require("express").Router();
const parentController = require("../../controllers/parentController");

router.get("/", parentController.getAllParents);
router.get("/:id", parentController.getOneParent);
router.post("/writeNote", parentController.writeNote);
router.delete("/:id", parentController.deleteParent);

module.exports = router;
