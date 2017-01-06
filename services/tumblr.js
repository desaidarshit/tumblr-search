var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();
/**
 * getPosts - get posts based on req params
 */
function getPosts(req,callback) {
    var request = require("request");
    var params = 'https://api.tumblr.com/v2/';
    var tumblr_api_key = 'zvxjNOc2ghgoTCMfAEPbwfnbVMCL4cEEiIjaZwC0qATIuCa2Ac';
    var tag_query = 0;
    if (req.query.hasOwnProperty("blog")) {
        params += 'blog/'+req.query.blog+'.tumblr.com/posts/?api_key='+tumblr_api_key;
        if (req.query.hasOwnProperty("tag")) {
            params += '&tag='+req.query.tag;
        }
    }
    else {
        params += 'tagged?tag='+req.query.tag+'&api_key='+tumblr_api_key;
        tag_query = 1;
    }
    request(params, function(error, response, body) {
        body = entities.decode(body);
        callback(body,tag_query);
    });
}

module.exports = {
    getPosts: getPosts
};