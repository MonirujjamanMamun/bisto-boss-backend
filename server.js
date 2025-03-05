const app = require('./app');
const { port } = require('./utils/allSecretExpt/allSecretExpt');
const dbConnection = require('./utils/db/dbConnection');

// db is connection
dbConnection();

app.listen(port, () => {
  console.log('server is running ', port);
});
