const { User , Thought } = require("../models");

module.exports = {
  // get all users
  getAllUsers(req, res) {
    User.find()
      .sort({ _id: -1 })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // get one user by id
  
  getUserById(req, res) {
    console.log(req.params.id);
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate({ path: "thoughts" })
      .populate({ path: "friends" })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User ID not found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Creating a new user
  createUser(req, res) {
    console.log(req.body);
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // update user by Id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Cannot update user" });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //Delete a User
  deleteUser(req, res) {
    User.findByIdAndRemove({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with this id" });
        }
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => {
        res.json({ message: "User deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // ADD a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  //Delete a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ message: "User with this ID does not exist." });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
