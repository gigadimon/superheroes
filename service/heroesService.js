const { Hero } = require("../schemas/Hero");
const {
  ValidationError,
  NotFoundError,
  HeroError,
} = require("../errors/heroErrors");
const fs = require("fs");
const path = require("path");

const getAllHeroes = async ({ page = 1, limit = 5 }) => {
  const parsedPage = Number(page);
  const parsedLimit = Number(limit);
  const skip = parsedPage * parsedLimit - parsedLimit;
  const heroes = await Hero.find({}).skip(skip).limit(parsedLimit);
  const total = await Hero.countDocuments({});

  return { heroes, total };
};

const getHeroById = async (id) => {
  return await Hero.findById(id);
};

const create = async (body) => {
  try {
    return await Hero.create(body);
  } catch (error) {
    throw new HeroError("Creating failed");
  }
};

const remove = async (id) => {
  return await Hero.findByIdAndDelete(id);
};

const updateHero = async (id, body) => {
  const { superpowers, images } = body;
  delete body.superpowers;
  delete body.images;
  const hero = await Hero.findById(id);
  if (!hero) {
    throw new NotFoundError("Hero not found");
  }

  if (hero.superpowers.includes(superpowers)) {
    throw new ValidationError("Superpower must be unique");
  }

  return await Hero.findByIdAndUpdate(
    id,
    { $set: { ...body }, $push: { superpowers, images } },
    {
      new: true,
    }
  );
};

const removeAvatar = async (id, avatarName) => {
  const hero = await Hero.findById(id);
  if (!hero) {
    throw new NotFoundError("Hero not found");
  }
  if (!hero.images.includes(avatarName)) {
    throw new NotFoundError("Avatar not found");
  }
  hero.images = hero.images.filter((avatar) => avatar !== avatarName);
  fs.unlinkSync(path.resolve(`./public/avatars/${avatarName}`));
  hero.save();
  return hero;
};

module.exports = {
  getAllHeroes,
  getHeroById,
  create,
  remove,
  updateHero,
  removeAvatar,
};
