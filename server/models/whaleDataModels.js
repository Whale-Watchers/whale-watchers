const { Pool } = require("pg");

const PG_URI =
  "postgres://ibqvjsvh:wDhGRr0AOqHJhBfoZUw6R8wimB-lcbgl@abul.db.elephantsql.com/ibqvjsvh";

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// postgres Schema: whalewatcher 
// Table name: whaleTable (whalewatcher.whaleTable)

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
