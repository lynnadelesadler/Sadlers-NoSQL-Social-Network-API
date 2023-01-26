const router = require('express').Router();
const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
  } = require('../../controllers/thoughtController');
  

  // /api/thoughts
  // Get all thoughts & Create new thought
  router.route('/').get(getAllThoughts).post(createThought);

  // /api/thoughts/:thoughtId
  // Get thought by ID & Update thought by ID & Delete thought by ID
  router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

   // /api/thoughts/:thoughtId/reactions
   // Create reaction for a thought & Delete reaction on a thought
  router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

  module.exports = router;