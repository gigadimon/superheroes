const {
  getAllHeroes,
  create,
  updateHero,
} = require("../service/heroesService");
const { createHero } = require("../controllers/heroesController");
const { getImageName } = require("../helpers/getImageName");
const { HeroError } = require("../errors/heroErrors");
const mockingoose = require("mockingoose");
const { Hero } = require("../schemas/Hero");
const { MongooseError } = require("mongoose");

describe("Get heroes data test", () => {
  // it("Testing creating image path", () => {
  //   const mReq = {
  //     body: { nickname: "nickname", images: [] },
  //     file: { filename: "name", file: { filename: "file name.jpg" } },
  //   };
  //   create(mReq.body)
  //     .then((data) => {
  //       return expect(data.images).arrayContaining(getImageName(mReq));
  //     })
  //     .catch((error) => {
  //       return expect(error).toBeInstanceOf(HeroError);
  //     });
  // });
  it("Should return mock hero with findById", () => {
    const mHero = {
      _id: "507f191e810c19729de860ea",
      nickname: "super hero",
      real_name: "real name",
      superpowers: ["superpower 1"],
      images: ["image 1"],
    };

    mockingoose(Hero).toReturn(mHero, "findOne");
    Hero.findById("507f191e810c19729de860ea")
      .then((data) => {
        expect(JSON.parse(JSON.stringify(data))).toMatchObject(mHero);
      })
      .catch((error) => expect(error).toBeInstanceOf(MongooseError));
  });
  it("Should delete images and superpowers from body after calling updateHero", () => {
    const mBody = {
      nickname: "nick name",
      images: "test.jpg",
      superpowers: "test superpower",
    };
    const id = "507f191e810c19729de860ea";
    updateHero(id, mBody).then(() => {
      expect(mBody).not.toHaveProperty("images");
      expect(mBody).not.toHaveProperty("superpowers");
    });
  });
});
