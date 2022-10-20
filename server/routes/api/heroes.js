const express = require("express");
const {
  getAll,
  getHero,
  createHero,
  deleteHero,
  changeHero,
} = require("../../controllers/heroesController");
const { asyncWrapper } = require("../../helpers/asyncWrapper");

const router = express.Router();

router.get("/", asyncWrapper(getAll));
router.get("/:heroId", asyncWrapper(getHero));
router.post("/", asyncWrapper(createHero));
router.delete("/:heroId", asyncWrapper(deleteHero));
router.put("/:heroId", asyncWrapper(changeHero));

module.exports = router;
