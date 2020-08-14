## Backend - Challenge:
This challenge is entirely focused on the backend and uses an external API
Test are found in tests/test.js

## Built API Route:
This API built two routes. The routes are dynamic, depending on the user input. <br>
The begining of the route is /api/posts. Then the user must input at least one tag into the route, but they can use more,
<br>For example: /api/posts/tech,health/

The next two route parameters are optional and deal with sorting the information given to the user.<br>
- The first is sortBy, which allows a user to sort by any field in the post, for example likes.<br>
- The second is the order of the sorting, either ascending or descending.<br><br>

Thus giving the user a full route, such as /api/posts/tech,health/likes/desc.  This will give all posts
That contain at least one health or tech tag, and ordered with the most likes at the top of the result.

## Developing Enviornment:
IDE: VS Code<br>
node: v12.4.0 <br>
npm: 6.9.0 <br>
test: Jest

## To start: 
- install npm and dependencies:<br>
    npm install<br>

- to run the API/server:<br>
    npm start<br>

- to run the test:<br>
    npm test<br>
    (Note: while testing, please open another terminal for testing while leave the server still running)
