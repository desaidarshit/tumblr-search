// Routes
module.exports = function(app){
    var tumblr = require('../services/tumblr');

    // Handle landing page
    app.get('/', function(req, res, next) {
        res.render('index')
    });

    // Handle ajax search request
    app.get('/search', function(req, res, next) {
        tumblr.getPosts(req, function (data,tag_flag) {
            var json = JSON.parse(data);
            if (tag_flag == 0) {
                var post_data = json['response']['posts'];
            }
            else {
                var post_data = json['response'];
            }
            for (var i=0; i < post_data.length; i++) {
                var type = post_data[i]['type'].toLowerCase();
                var flag = type+'_flag';
                post_data[i][flag] = true;
                post_data[i]['count'] = i+1;
                if (type == 'video') {
                    post_data[i]['video_embed'] = post_data[i]['player'][0]['embed_code'];
                }
                if (type == 'photo') {
                    post_data[i]['photo_caption'] = post_data[i]['caption'];
                }
            }
            // console.log('Final post data');
            // console.log(post_data);
            if (post_data.length == 0) {
                res.send('');
            }
            else {
                res.render('posts', {post_data: post_data}, function (err, html) {
                    res.send(html);
                });
            }
        });
    });
};
