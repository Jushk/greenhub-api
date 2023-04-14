# Controllers

This respository contains the code for the controllers of our project.

## Description

Our project uses controllers to manage different aspects of our system. The controllers are written in Javascript and uses various libraries such as bcrypt, jsonwebtoken, and cookies.

### Files

- `auth.controller.js`: This file contains the code for users authentications such as register, login, and logout.
- `comment.controller.js`: This file contains the code for user's post for comments
- `post.controller.js`: This file contains the code for controlling posts
- `user.controller.js`: This file contains the code for controlling user's requests

## Usage

Import the controllers object that contains all the controller into your routes in Node.js application using require.

```javascript
const router = require("express").Router();
const controller = require("../controllers");

//  Handles all req and res method to make route readable
router.post("/login", controller.auth.login);
router.post("/addComment/:postId", controller.comment.addComment);

//  ..

module.exports = router;
```
