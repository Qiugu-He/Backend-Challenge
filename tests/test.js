const request = require('request');
const axios = require('axios');

describe('Testing route: /api/ping ', function() {
    it('Test 1 - testing response status code with correct route', function(done) {
        request('http://localhost:8000/api/ping', function(error, response, body) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('Test 2 - testing response body with correct route', function(done) {
        request('http://localhost:8000/api/ping', function(error, response, body) {
            expect(body).toEqual('{"success":"true"}');
            done();
        });
    });

    it('Test 3 - testing status code with invalid route', function(done) {
        request('http://localhost:8000/api/blog', function(error, response, body) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });
});


describe('Testing route: /api/posts ', function() {
    it('Test 4 - testing response status code with correct route', function(done) {
        request('http://localhost:8000/api/posts/health', function(error, response, body) {
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('Test 5 - testing status code with invalid route', function(done) {
        request('http://localhost:8000/api/blog', function(error, response, body) {
            expect(response.statusCode).toEqual(404);
            done();
        });
    });

    it('Test 7 - testing status code with three parameters', function(done) {
        request('http://localhost:8000/api/posts/health,tech/likes/desc', function(error, response, body) {
            expect(response.statusCode).toEqual(200);
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






