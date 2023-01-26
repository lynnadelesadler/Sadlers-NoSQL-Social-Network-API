const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  // /api/thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((Thoughts) => res.json(Thoughts))
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // Create a new Thought
  // /api/thoughts
  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: Thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but no user found",
            })
          : res.json("Created thought")
      )
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },

  // GET Thought by ID
  // /api/thoughts/:id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate("reactions")
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(Thought)
      )
      .catch((err) => res.status(400).json(err));
  },

  // update a thought
  // /api/thoughts/:thoughtId
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No thought with this ID" })
          : res.json(Thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Delete thought by ID
  // /api/thoughts/:id
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No thought ID" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Thought deleted, no user ID" })
          : res.json({ message: "Thought deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create reaction for a thought
  // /api/thoughts/:thoughtId/reactions
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((Thought) =>
      Thought
          ? res.json(Thought)
          : res.status(404).json({ message: "No thought with this id!" })
      )
      .catch((err) => res.status(400).json(err));
  },

  // delete a reaction on a thought
  // /api/thoughts/:thoughtId/reactions
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then(res.json("Reaction deleted"))
      .catch((err) => res.json(err));
  },
};
