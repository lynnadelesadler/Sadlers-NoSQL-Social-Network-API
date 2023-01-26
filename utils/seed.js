const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usersArr,emailsArr, getRandomThoughts, getRandomArrItem} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Drop existing users
    await User.deleteMany({});
    // Drop existing thought
    await Thought.deleteMany({});

    // Create empty array to hold the thoughts
    const thoughts = [];

    for (let i = 0; i < usersArr.length; i++) {
        const numThoughts = 1;
        const numReactions = 5;
        const user = usersArr[i];

        const userThoughts = getRandomThoughts(numThoughts, numReactions, user);
    
        thoughts.push(...userThoughts)
      };

    await Thought.collection.insertMany(thoughts);
    console.log('Thoughts Seeded 🌱');

    // Create empty array to hold the users
    const users = [];

    for (let i = 0; i < usersArr.length; i++) {
        const email = emailsArr[i];
        const user = usersArr[i];

        const thoughtData = await Thought.find().lean();

        const randomThoughtData = getRandomArrItem(thoughtData);
        
        users.push({
            username: user,
            email: email,
            thoughts: [randomThoughtData._id],
            friends: []
        });
      }

      await User.collection.insertMany(users);
      console.log('Seeding complete! 🌱');

      return;
});