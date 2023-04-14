# Middleware

Is a function that sits between a web application's client and server and handles incoming requests and outgoing responses

## Authorized token

The authorizedToken middleware function checks if a client has a valid access token in the authorization header of their HTTP request. If the access token is missing or invalid, the middleware function returns a 401 (Unauthorized) response. If the access token is valid, the middleware function decodes the token and attaches the decoded user object to the request object before calling the next middleware function.

## Credentials

The credentials middleware function checks if the incoming request is from an allowed origin. If the request is from an allowed origin, the middleware function sets the Access-Control-Allow-Credentials header to true. This header enables cookies and other user credentials to be sent with the request. The middleware function then calls the next middleware function.

### Installation

1. Install Node.js and npm on your system.
2. Install the required packages by running npm install dotenv jsonwebtoken in your terminal.

## Usage

To use these middleware functions, require them in your Node.js file where you need to authenticate and authorize incoming requests.

```javascript
const authorizedToken = require("../middleware/authorizedToken");
const credentials = require("../middleware/credentials");

app.use(authorizedToken);
app.use(credentials);
```

The authorizedToken middleware function should be used before any other middleware functions that require authentication, such as routes that require a user to be logged in.

The credentials middleware function should be used before any other middleware functions that require cookies or other user credentials to be sent with the request.
