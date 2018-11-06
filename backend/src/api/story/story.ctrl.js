const chalk = require("chalk");
const multer = require("multer");
const User = require("db/model/user");
const Story = require("db/model/story");
const fs = require("fs");
const FroalaEditor = require("wysiwyg-editor-node-sdk");

const config = require("config.js");

exports.addStory = async (req, res) => {
  try {
    const email = req.decoded.email;
    const displayName = req.decoded.displayName;
    const storyInfo = req.body.storyInfo;
    let user = await User.findOneByEmail(email);
    let story = await Story.create(storyInfo, email, displayName, user._id);
    user.stories.push(story._id);
    await user.save();
    res.status(200).json({
      message: "add story successfully!"
    });
  } catch (error) {
    res.status(500).json({
      message: "add story failed....."
    });
  }
};

exports.uploadImage = async (req, res) => {
  FroalaEditor.Image.upload(req, "public/uploads/", function (err, data) {
    data.link = data.link.replace("public/", "");
    data.link = config.url + data.link;
    if (err) {
      return res.send(JSON.stringify(err));
    }

    res.send(data);
  });
};

exports.getStories = async (req, res) => {
  const email = req.query.email;
  const displayName = req.query.displayName;
  try {
    const stories = await Story.find({ displayName: displayName });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({
      message: "get story failed....."
    });
  }
};

exports.getStory = async (req, res) => {
  const storyId = req.query.storyId;
  try {
    const story = await Story.findById(storyId).populate("authorObject");
    story.viewCount++;
    await story.save();
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({
      messgae: "getStory faild",
      err: error
    });
  }
};

exports.deleteStory = async (req, res) => {
  const storyId = req.params.id;
  const userEmail = req.decoded.email;
  try {
    let story = await Story.findOneAndRemove({ _id: storyId, author: userEmail });
    res.status(200).json({
      messgae: "cool"
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getLimitedStory = async (req, res) => {
  let count = parseInt(req.params.count);
  try {
    let stories = await Story.find().sort({ viewCount: -1 }).limit(count).populate("authorObject");
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateStory = async (req, res) => {
  const { storyInfo, storyId } = req.body;
  try {
    console.log(storyId);
    const story = await Story.findOneAndUpdate({ _id: storyId }, { $set: storyInfo });
    res.status(200).json(story);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
