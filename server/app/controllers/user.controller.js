const db = require("../models")
const User = db.user

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
    //TODO verify current user
    let user = await User.findById(req.params.id).populate("accounts").populate({
      path: 'accounts',
      populate: {
        path: 'transactions',
        model: 'Transaction'
      }
    });

    console.log(user);

    userInfo = {
      id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      accounts: user.accounts,
    }
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
