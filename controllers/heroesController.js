const {
  getAllHeroes,
  getHeroById,
  create,
  remove,
  updateHero,
  removeAvatar,
} = require("../service/heroesService");
const { getImageName } = require("../helpers/getImageName");

const getAll = async (req, res, next) => {
  const { query } = req;
  const heroes = await getAllHeroes(query);

  return res.json({ message: "These are all heroes", data: heroes });
};

const getHero = async (req, res, next) => {
  const { heroId } = req.params;
  const hero = await getHeroById(heroId);

  return hero ? res.json({ message: "This is your hero", data: hero }) : next();
};

const createHero = async (req, res, next) => {
  const { body } = req;

  if (req.file) {
    body.images = getImageName(req);
  }

  const hero = await create(body);

  return res.status(201).json({ message: "Created", data: hero });
};

const deleteHero = async (req, res, next) => {
  const { heroId } = req.params;
  const hero = await remove(heroId);
  return hero ? res.json({ message: `Hero ${hero.nickname} deleted` }) : next();
};

const changeHero = async (req, res, next) => {
  const { heroId } = req.params;
  const { body } = req;

  if (req.file) {
    body.images = getImageName(req);
  }

  const newHero = await updateHero(heroId, body);
  return newHero
    ? res.json({ message: "Hero updated", data: newHero })
    : next();
};

const deleteAvatar = async (req, res, next) => {
  const { heroId, avatarName } = req.params;

  const newHero = await removeAvatar(heroId, avatarName);
  return newHero
    ? res.json({ message: "Avatar removed", data: newHero })
    : next();
};

module.exports = {
  getAll,
  getHero,
  createHero,
  deleteHero,
  changeHero,
  deleteAvatar,
};
