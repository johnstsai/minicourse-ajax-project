
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ',' + cityStr;
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address +'';
    $body.append('<img class="bgimg" src="' + streetviewUrl +'">');
    // New York Times AJAX
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "05913cc4b24c4753bf467f0344f785d6",
            'q': cityStr,
            'sort': "newest"
        });

    $.getJSON(url, function(data){
        $nytHeaderElem.text('New York Time Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i=0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + 
                '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + 
                '<p>' + article.snippet + '</p>' + '</li>');
        };
    }).error(function(e) {
        $nytHeaderElem.text('New York Time Articles can not be loaded.');
    });


    return false;
};

$('#form-container').submit(loadData);
