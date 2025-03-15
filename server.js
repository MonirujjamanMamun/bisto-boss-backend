require('dotenv').config();
const app = require('./app');
const dbConnection = require('./utils/db/dbConnection');

// db is connection
dbConnection();

const port = process.env.PORT || 8181;

app.listen(port, () => {
  console.log('server is running ', port);
});
