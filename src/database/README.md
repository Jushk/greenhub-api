# MONGODB DATABASE

This is a Node.js script that establishes a connection to a MongoDB database using Mongoose. The script uses the dotenv package to load environment variables, specifically the URI for the MongoDB database. If the initial connection attempt is unsuccessful, the script retries the connection every 5 seconds until a successful connection is established.

## Installation

1. Install Node.js and npm on your system
2. Create a `.env` file in the root directory of your project and add the following line: `MONGO_DB_URI=<your MongoDB URI>`
3. Install the required packages by running npm install dotenv mongoose in your terminal.

## Usage

To use this script, simply require it in your Node.js file where you need to access the MongoDB Database

```javascript
const db = require("./database");
```

the `db` variable now contains a reference to the Mongoose connection object that you can use to interact with the database.
