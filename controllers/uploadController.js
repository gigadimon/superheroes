const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadController = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const { filename } = req.file;
  const [, extention] = filename.split(".");
  req.filename = uuidv4();
  Jimp.read(path.resolve(`./tmp/${filename}`), (err, avatar) => {
    if (err) next(err);
    avatar
      .resize(250, 250)
      .write(
        path.resolve(`./public/avatars/${req.filename}.${extention}`),
        () => {
          try {
            fs.unlinkSync(path.resolve(`./tmp/${filename}`));
          } catch (error) {
            next(error);
          }
        }
      );
  });
  next();
};

module.exports = { uploadController };
