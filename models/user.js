const { Schema, model } = require('mongoose');
require('mongoose-type-email');


// Schema to create User model
const userSchema = new Schema(
    {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'User email address required'],
        unique: true,
        type: Schema.Types.Email
        },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
},
  {
       // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that retrieves the length of the user's friends array field on query
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
});
  

const User = model('user', userSchema);

module.exports = User;