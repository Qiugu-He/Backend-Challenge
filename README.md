## Node Express API Challenge :
This challenge is entirely focused on the build two API routes using an external API.
### The Frist API Route:
> GET: http://localhost:8000/api/ping

This is a simple API route which will response with { success: true } if requests are sent successfully. (status code 200)

<br><b>Routing</b> :
- server.js 
```JavaScript
   const pingRoute = require('./routes/ping');

   app.use('/api', pingRoute); 

```
- /routes/ping.js
```JavaScript
    router.get('/ping', (req, res) => {
        res.status(200).send({
            success: 'true',
        })
    });

```

### The Second API Route:
>GET: http://localhost:8000/api/posts/tech,health<BR>
>GET: http://localhost:8000/api/posts/history/likes/desc

This routes are dynamic, depending on the user input. The begining of the route is /api/posts. Then the user must input at least one tag into the route, but they can use more,
> For example: /api/posts/tech,health/

The next two route parameters are optional and deal with sorting the information given to the user.<br>
1.  The first is sortBy, which allows a user to sort by any field in the post, for example likes.<br>
2.  The second is the order of the sorting, either ascending or descending.<br>
> For example: /api/posts/tech,health/likes/desc

 This will give all posts
that contain at least one health or tech tag, and ordered with the most likes at the top of the result.

<br><b>Routing</b>
- server.js
```JavaScript
    const postRoute = require('./routes/posts');
    app.use('/api', postRoute);
```
- routes/posts.js
```JavaScript
    const { getPosts } = require('../controllers/posts');
    router.get('/posts/:tags/:sortBy?/:direction?', getPosts);
```
- controllers/posts.js
```JavaScript
    //Main code block 
    exports.getPosts = (req, res) => {
        ...
        //case 1: Only one tag is requeted by user
        axios.get(`http://external.api.url./posts?tag=${tags}&sortBy=${sortBy}&direction=${direction}`)
        .then(request => {
            //get data
            let data = request.data.posts;
            //sorting
            if (sortBy) {
                if (direction === 'desc') {
                    data = data.sort((a, b) => (b[sortBy] > a[sortBy]) ? 1 : -1);
                } else {
                    data = data.sort((a, b) => (b[sortBy] < a[sortBy]) ? 1 : -1);
                }
            }

            res.status(200).send(data);
        })
        .catch(error => {
            res.status(400).send({
            error: 'Tags parameter is required',
            })
            console.log(error)
        });
    }

    //case 2: more than one tags is requested by user, we need to remove duplicate posts
    //For the detail please check the source code
    ...
```

## Testing
Tests routing with Jest example
>GET: http://localhost:8000/api/posts/history/likes/asc
```JavaScript
    ...
    describe('Testing route: /api/posts ', function() {
    it('Test 4 - testing response status code with correct route', function(done) {
        request('http://localhost:8000/api/posts/history/likes/asc', function(error, response, body) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('Test 5 - testing status code with invalid route', function(done) {
        request('http://localhost:8000/api/posts/history/likes/asc', function(error, response, body) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });

    it('Test 8 - testing sort', function(done) {
        axios.get('http://localhost:8000/api/posts/history/likes/asc')
        .then(res => {
            let post = res.data;
            let postLikes = [];
            let test = true;
            // Gets all post likes
            for (let i = 0; i < post.length; i++) {
                postLikes.push(post[i].likes)
            }
            // Loops the likes and if i < i + 1, the test will fail
            for (let i = 0; i < postLikes.length; i++) {
                if (postLikes[i] < postLikes[i + 1]) {
                    test = false;
                }
            }
            expect(test).toEqual(true);
            })
            .catch(error => {
                console.log(error)
            })
            done();
    });
});
```


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
