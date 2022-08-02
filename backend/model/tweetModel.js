//      @step-11    define the schema for the goals model

//      import
const mongoose = require('mongoose');

//      define schema with mongoose
const tweetSchema = mongoose.Schema(
  {
    //    @step-18 add reference to user id to connect tables
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tweetBody: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//      export Goal shcema
module.exports = mongoose.model('Tweet', tweetSchema);
