# Models

In web development, models are the representation of data that interacts with a database. Models define the structure of the data, how it is validated, and how it can be manipulated.

This project contains the following models:

## Comment

The Comment model represents a comment made on a post by a user. It contains the following fields:

- author (required): the user who made the comment
- content (required): the content of the comment
- timestamps: automatically generated timestamps for when the comment was created and updated

## Post

The Post model represents a post made by a user. It contains the following fields:

- author (required): the user who made the post
- title (required): the title of the post
- content (required): the content of the post
- tags: an array of tags associated with the post
- timestamps: automatically generated timestamps for when the post was created and updated

## User

The User model represents a user of the application. It contains the following fields:

- name (required): the name of the user
- username (required, unique): the username of the user
- password (required): the password of the user (stored securely as a hash)
- course (required): the course the user is studying
- bio: a short bio of the user
- tags: an array of tags associated with the user
- profilePicture: the URL of the user's profile picture
- refreshToken: a reference to a RefreshToken object (used for authentication)
- timestamps: automatically generated timestamps for when the user was created and updated

## RefreshToken

The RefreshToken model represents a refresh token used for authentication. It contains the following fields:

- token (required): the refresh token (stored securely as a hash)
- userUd (required): a reference to the user's ID who owns the refresh token
- createdAt: the date and time when the refresh token was created

Each model is defined using the Mongoose library for MongoDB.
