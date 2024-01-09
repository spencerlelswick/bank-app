const { User } = require("../models")


exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.')
}

exports.userBoard = (req, res) => {
  res.status(200).send('User Content.')
}

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.')
}

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.')
}

exports.show = async (req, res) => {
  try {
    res.status(200).json(await User.findById(req.params.id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
