const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createPostController(req, res) {
  console.log("File:", req.file);
  console.log("Body:", req.body);
  const file = req.file;
  const base64ImageFile = new Buffer.from(file.buffer).toString("base64");

  const caption = await generateCaption(base64ImageFile);
  const result = await uploadFile(file.buffer, `${uuidv4()}`);
  const post = await postModel.create({
    caption: caption,
    image: result.url,
    user: req.user._id,
  });

  res.status(201).json({
    message: "Success",
    post,
  });
}

module.exports = {
  createPostController,
};
