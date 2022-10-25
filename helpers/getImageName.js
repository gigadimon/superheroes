const getImageName = (req) => {
  const { filename } = req;
  const { filename: uploadedFileName } = req.file;
  const [, extention] = uploadedFileName.split(".");
  return `${filename}.${extention}`;
};

module.exports = {
  getImageName,
};
