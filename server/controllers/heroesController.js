const {
  getAllHeroes,
  getHeroById,
  create,
  remove,
} = require("../service/heroesService");

const getAll = async (req, res, next) => {
  const { query } = req;
  const heroes = await getAllHeroes(query);

  return res.json({ message: "these are all heroes", data: heroes });
};

const getHero = async (req, res, next) => {
  const { heroId } = req.params;
  const hero = await getHeroById(heroId);

  return hero ? res.json({ message: "this is your hero", data: hero }) : next();
};

const createHero = async (req, res, next) => {
  const result = await create(req.body);

  return res.status(201).json({ message: "created", data: result });
};

const deleteHero = async (req, res, next) => {
  const { heroId } = req.params;
  const hero = await remove(heroId);
  return hero ? res.json({ message: "hero deleted" }) : next();
};

const changeHero = async (req, res, next) => {
  res.json({ message: "template message" });
};

module.exports = {
  getAll,
  getHero,
  createHero,
  deleteHero,
  changeHero,
};
