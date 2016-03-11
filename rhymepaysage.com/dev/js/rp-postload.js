/*
$(function() {
  $(document).on('click', 'a', function() {
    var href = $(this).attr("href");

    history.pushState({}, '', href);
    $main.load(href);
    return false;
  });
});
*/


$(document).ready(function(){
	if($("#container").size()>0){
	    if (document.createStyleSheet){
	        document.createStyleSheet('/css/rp-app.css');
	    }
	    else {
	        $("head").append($("<link rel='stylesheet' href='/css/rp-app.css' type='text/css' media='screen' />"));
	    }
	}

	$('#nav-secondary li a').on("click", function( event ){
       event.preventDefault();
	    thisBodyClass = $(this).attr('id');
	    $('body').removeClass().addClass( thisBodyClass ); 
    });
});