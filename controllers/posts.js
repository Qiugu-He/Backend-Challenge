const axios = require('axios');

exports.getTags = (req, res) => {
    //Query Paraemter fileds
    const { tags, sortBy, direction } = req.params;

    //Acceptable fields for sortBy and direction
    const sortFields = ['id', 'reads', 'likes', 'popularity', undefined];
    const direFields = ['desc','asc', undefined];
    if (sortFields.indexOf(sortBy) === - 1) {
        res.status(400).send({
            error: 'sortBy value is invalid',
          });
    }
    if (direFields.indexOf(direction) === -1) {
        res.status(400).send({
            error: 'sortBy value is invalid',
        });
    }

    //Case 1:  more than one tags are requested by user, we need to remove the duplicate posts
    if (tags.includes(',')) {
        let reqTags = tags.split(',');
        let getPaths = reqTags.map((tag, i) => {
            return axios.get(`http://hatchways.io/api/assessment/blog/posts?tag=${tag}&sortBy=${sortBy}&direction=${direction}`)
        });

        //Using axios.all call to resolve all requests
        axios.all([
            ...getPaths
        ]) 
        //since there are 9 potentail tags, they all needs to be considered
        .then(axios.spread((tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9) => {
            let tags = [
                tag1 ? tag1.data.posts : '',
                tag2 ? tag2.data.posts : '',
                tag3 ? tag3.data.posts : '',
                tag4 ? tag4.data.posts : '',
                tag5 ? tag5.data.posts : '',
                tag6 ? tag6.data.posts : '',
                tag7 ? tag7.data.posts : '',
                tag8 ? tag8.data.posts : '',
                tag9 ? tag9.data.posts : ''
            ]
            //remove repeated by compare the tag's posts id, and then push the reuslt into response
            let post = {};
            for (let i = 0; i < tags.length; i++) {
                let thePost = tags[i];
                for (let i = 0; i < thePost.length; i++) {
                    post[thePost[i].id] = thePost[i];
                }
            }
            let result = [];
            for (let key in post) {
                result.push(post[key]);
            }

            //sorting
            if (sortBy) {
                if (direction === 'desc') {
                    result = result.sort((a, b) => (b[sortBy] > a[sortBy]) ? 1 : -1);
                } else {
                    result = result.sort((a, b) => (b[sortBy] < a[sortBy]) ? 1 : -1);
                }
            }
            
            //return the final response
            res.status(200).send(result);
        }))
        .catch(error => {
            res.status(400).send({
            error: 'Tags parameter is required',
            })
            console.log(error)
        });
    } 
    
    // case 2: there is only one tag is requested, so we dont need to worry about duplicate posts
    else {
        axios.get(`http://hatchways.io/api/assessment/blog/posts?tag=${tags}&sortBy=${sortBy}&direction=${direction}`)
        .then(request => {
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
};