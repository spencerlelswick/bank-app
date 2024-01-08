const { User } = require("../models")


module.exports = {
  index,
  create,
  show,
  update,
  allAccess,
  userBoard
}


allAccess = (req, res) => {
  res.status(200).send('Public Content.')
}

userBoard = (req, res) => {
  res.status(200).send('User Content.')
}


async function show(req, res) {
  try {
    res.status(200).json(await User.findById(req.params.id));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
