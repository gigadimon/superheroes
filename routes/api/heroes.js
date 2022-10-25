const express = require("express");
const { upload } = require("../../middlewares/uploadMiddleware");
const {
  getAll,
  getHero,
  createHero,
  deleteHero,
  changeHero,
  deleteAvatar,
} = require("../../controllers/heroesController");
const { asyncWrapper } = require("../../helpers/asyncWrapper");
const { uploadController } = require("../../controllers/uploadController");
const { validateHero } = require("../../validation/heroValidation");

const router = express.Router();

router.get("/", asyncWrapper(getAll));
router.get("/:heroId", asyncWrapper(getHero));
router.post(
  "/",
  [upload.single("avatar"), uploadController],
  validateHero,
  asyncWrapper(createHero)
);
router.delete("/:heroId", asyncWrapper(deleteHero));
router.patch("/:heroId/avatars/:avatarName", asyncWrapper(deleteAvatar));
router.patch(
  "/:heroId",
  [upload.single("avatar"), uploadController],
  asyncWrapper(changeHero)
);

module.exports = router;
