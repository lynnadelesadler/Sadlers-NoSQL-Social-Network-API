const usersArr = [
  'Lynn',
  'Tim',
  'Adelynn',
  'Jackson',
  'Emma',
  'Bradford',
  'Joanne',
  'Tom',
  'Patricia',
  'Jake',
  'Beverly',
  'Rick',
  'Daryl',
  'John',
  'Elaine',
  'Corey',
  'Eleanor',
  'Chris',
  'Mary',
  'Steve'
  ];

const emailsArr = [
  'Lynn@email.com',
  'Tim@email.com',
  'Adelynn@email.com',
  'Jackson@email.com',
  'Emma@email.com',
  'Bradford@email.com',
  'Joanne@email.com',
  'Tom@email.com',
  'Patricia@email.com',
  'Jake@email.com',
  'Beverly@email.com',
  'Rick@email.com',
  'Daryl@email.com',
  'John@email.com',
  'Elaine@email.com',
  'Corey@email.com',
  'Eleanor@email.com',
  'Chris@email.com',
  'Mary@email.com',
  'Steve@email.com'
  
];

const thoughtsArr = [
  'Organization App',
  'Exercise every day',
  'Daily dose of Emergen-C',
  'In need of new Audible book',
  'Need a recipe for dinner',
  'I am hungry for a snack',
  'Time to get comfy and watch a movie',
  'Who else loves to go skiing',
  'Just keep swimming says Dorey',
  'Cultivate a growth mindset',
  'Its not about the Destination but the Journey',
  'Yummy Cheese',
  'Hello World',
  'We never stop improving',
  'I love JavaScript',
  'Treat yo self',
  'pay bills',
  'treat others how you wish to be treated',
];

const reactionsArr = [
  'Wow!',
  'Very lame',
  'Awesome!',
  'No way!',
  'Honestly...',
  'Weird but ok...',
  'Great!',
  'Confused',
  'Why?',
  'Love it!',
  'Truth!',
  'Be honest!',
  'Weird?',
  'Keep it real!',
  'Basic...',
  'That is fire'
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];


const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
          published: Math.random() < 0.5,
          description: getRandomArrItem(thoughtsArr),
          buildSuccess: Math.random() < 0.5,
          reactions: [...getRandomReactions(3)],
        });
      }
      return results;
    };

const getRandomReactions= (int) => {
  if (int === 1) {
    return getRandomArrItem(reactionsArr);
  }
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandomArrItem(reactionsArr),
      user: getRandomArrItem(usersArr),
    });
  }
  return results;
};

module.exports = {
  usersArr,
  emailsArr,
    getRandomThoughts,
    getRandomArrItem 
}