const { ConflictError, ValidationError } = require("../errors/heroErrors");
const { Hero } = require("../schemas/Hero");

const validateHero = async (req, res, next) => {
  const { body } = req;
  const hero = await Hero.findOne({ nickname: body.nickname });
  if (hero) {
    return next(
      new ConflictError("Superhero already added to your collection")
    );
  }
  const heroModel = new Hero(body);
  try {
    await heroModel.validate();
  } catch (error) {
    const errorProperty = Object.keys(error.errors).join("");
    const errorMessage = error.errors[errorProperty].properties.message;
    return next(new ValidationError(errorMessage));
  }
  next();
};

module.exports = {
  validateHero,
};
