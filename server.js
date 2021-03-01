// load .env data into process.env
require('dotenv').config();

const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8081;
const cookieSession = require("cookie-session");
const cors = require("cors");

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect()
  .then(() => console.log("connected"))
  .catch((error) => console.log("error db connect",error));

App.use(cors());
// cookies
App.use(cookieSession({
  name: "session",
  keys: ["user_id"]
}));



// seperated routes
const favourites = require("./routes/favourites");
const loginRoutes = require("./routes/users");
const apiRoutes = require("./routes/apiRoutes");

// Resource route for favourites:
// App.use("/favourites", favourites(db));
App.use("/", favourites(db));
App.use("/", loginRoutes(db));
App.use("/", apiRoutes(db));

// Sample GET route
App.get('/', (req, res) => res.json({message: "Seems to work!"}));

// An api endpoint that returns a short list of items
App.get('/api/getList', (req,res) => {
  const list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});


App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
