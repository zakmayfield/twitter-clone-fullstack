const path = require('path');

//      @step-1     set up the server.js file and call in all of the required imports

//      imports
require('dotenv').config();
const express = require('express');
require('colors');

//    @step-14    importing error middleware -- see line 28 to see the server using it
const { errorHandler } = require('./middleware/errorMiddleware');

//      @step-10    import connectDB from db.js and run it
const connectDB = require('./config/db');
connectDB();

//      variables
const app = express();
const port = process.env.PORT || 4000;

//      middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//      routes
//      @step-4     require the goalRoutes
app.use('/api/tweets', require('./routes/tweetRoutes'));
//      @step-17a
app.use('/api/users', require('./routes/userRoutes'));

// serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

//    error middleware
app.use(errorHandler);

//      server listen
app.listen(port, () =>
  console.log(`Server running on port ${port}`.underline.blue)
);
