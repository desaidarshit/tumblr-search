// Post Data Array
var postData = [];

// Dom ready
$(document).ready(function() {

    // Search click
    $("button.search-submit").on('click', function(event) {
        event.preventDefault();
        var blog = $("input#blog_name").val();
        var tag = $("input#tag").val();
        var base_url = '/search/?';
        if (blog.length ==0 && tag.length == 0) {
            alert('Please enter tag or blog name')
            return false;
        }
        if (blog.length > 0) {
            base_url += 'blog='+blog;
            if (tag.length > 0) {
                base_url += '&tag='+tag;
            }
        }
        else {
            base_url += 'tag='+tag;
        }
        $.ajax(base_url, {
            success: function(data) {
                if (data.length ==0)
                {
                    data = '<h3>No Results found</h3>';
                }
                $('.search-results').html(data);
            },
            error: function(error) {
               console.log('ajax error');
               console.log(error);
            }
        });
    });
    // Handle add click event
    $("body").on('click', ".add-button", function(event){
        event.preventDefault();
        var title = $(this).attr('title');
        var type = $(this).attr('type');
        var id = $(this).attr('id');
        var content = $("ul.fav-list").html();
        var post_content = $("#post-"+id+" .record").html();
        if (type == 'text') {
            var main = 'Text Post: '+title;
        }
        else {
            var main = post_content;
        }
        var html = '<li class="fav-post" id="fav-'+id+'"><div class="post-record" id="post-'+id+'"><div id="content"><img src="../images/remove.png" class="rm-button"';
        html += 'title="'+title+'" type="'+type+'" id="'+id+'" /></div><div class="record ' + type + '-record">';
        html += main + '</div></div></li>';

        content += html;
        $("ul.fav-list").html(content);

    });

    // Handle remove click event
    $("body").on('click', ".rm-button", function(event) {
        event.preventDefault();
        var id = $(this).attr('id');
        $("#fav-"+id).remove();
    });
});