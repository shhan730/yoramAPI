const app = require('../index.js');
const syncDb = require('./sync-db');

syncDb().then(_=>{
  console.log('DB Sync Complete');
  app.listen(3000, () => {
    console.log('Server Running');
  });
});