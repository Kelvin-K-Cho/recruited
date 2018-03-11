/*eslint max-len: ["error", { "ignoreComments": true }]*/
/*
Recruited is developed using the MERN stack (MongoDB, Express, React/Redux, Nodejs).
- Node is a runtime environment that allows us to
- Express is a framework designed to simplify implmenting backend on Node.
- MongoDB is a NoSQL database that houses all our app's information. Mongoose allows us
to communicated with the offsite hosted server.
- React/Redux handles our frontend to enable dynamic rendering for SPA purposes.
*/


const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
const path = require("path");
require("./models/User");
require("./models/Jobs");
require("./models/Resumes");
require("./services/passport");


//mongoose connects us to the offsite database for our development/production environment
mongoose.connect(keys.mongoURI);

//creates a new express server for our browser to access to see the application.
const app = express();

app.use('/public', express.static(path.join(__dirname + '/public')));

//Applies middleware that ensures our information comes back as json files.
app.use(bodyParser.json());
//Enable cookie functionality to preserve state on user's side.
app.use(
  cookieSession({
    //Cookie will live for one month.
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//Apply and run passport's authentication processes.
app.use(passport.initialize());
app.use(passport.session());

//Add the routes for application CRUD.
require("./routes/authRoutes")(app);
require("./routes/jobRoutes")(app);
require("./routes/resumeRoutes")(app);
require("./routes/profileRoutes")(app);

//If the deployment of the application is on the production level, the app will create
//an optimized version of the build to run efficiently in the production environment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//If the deployment of the app is on the production level, set the server port offered
//by production site will be used to listen.  Otherwise, access to the development
//backend will be on http://localhost:5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
