const { Hero } = require("../schemas/Hero");

const getAllHeroes = async ({ page = 1, limit = 5 }) => {
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const skip = parsedPage * parsedLimit - parsedLimit;

  return Hero.find({}).skip(skip).limit(parsedLimit);
};

const getHeroById = async (id) => {
  return Hero.findById(id);
};

const create = async (body) => {
  return Hero.create(body);
};

const remove = async (id) => {
  return Hero.findByIdAndDelete(id);
};

module.exports = {
  getAllHeroes,
  getHeroById,
  create,
  remove,
};
