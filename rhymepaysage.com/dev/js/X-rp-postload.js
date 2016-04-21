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
    FastClick.attach(document.body);

	if($("#container").size()>0){
	    if (document.createStyleSheet){
	        document.createStyleSheet('/css/rp-app.css');
	    }
	    else {
	        $("head").append($("<link rel='stylesheet' href='/css/rp-app.css' type='text/css' media='screen' />"));
	        $("head").append($("<link href='\/\/cloud.webtype.com/css/a27af272-68ce-4ff3-b0c0-c4f3e4e2766b.css' rel='stylesheet' type='text/css' />"));
	    }
	}

	$('#nav-secondary li a').on("click", function( event ){
       event.preventDefault();
	    thisBodyClass = $(this).attr('id');
	    $('body').removeClass().addClass( thisBodyClass ); 
    });


	// initialize slider
	$('.slider').slick({
		  speed: 300,
		  lazyLoad: 'ondemand',
		  arrows: true,
		  dots: false,
		  responsive: [
		    {
		      breakpoint: 424,
		      settings: {
		        dots: true,
		        arrows: false,
		      }
		    }
		    // You can unslick at a given breakpoint now by adding:
		    // settings: "unslick"
		    // instead of a settings object
		  ]
	});

	// initialize lightbox
    var $pswp = $('.pswp')[0];
    var image = [];

    $('._forLightbox').each( function() {
        var $pic     = $(this),
            getItems = function() {
                var items = [];
                $pic.find('a').each(function() {
                    var $href   = $(this).attr('href'),
                        $size   = $(this).data('size').split('x'),
                        $width  = $size[0],
                        $height = $size[1];

                    var item = {
                        src : $href,
                        w   : $width,
                        h   : $height
                    };

                    items.push(item);
                });
                return items;
            };

        var items = getItems();

        $.each(items, function(index, value) {
            image[index]     = new Image();
            image[index].src = value['src'];
        });

        $pic.on('click', function(event) {
            event.preventDefault();
            
            $('body').addClass('working');
            
            var $index = $(this).index();
            var options = {
                bgOpacity: 1
            };

            var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
            lightBox.init();
        });
    });

	// look for font load
	var fontTitle = new FontFaceObserver('Founders Grotesk Web', {
	  weight: 300
	});
	var fontHed = new FontFaceObserver('Founders Grotesk Web', {
	  weight: 600,
	  style: 'normal'
	});
	var fontHedItalic = new FontFaceObserver('Founders Grotesk Web', {
	  weight: 600,
	  style: 'italic'
	});
	var fontAlt = new FontFaceObserver('Founders Grotesk Text Web', {
	  weight: 600,
	  style: 'normal'
	});
	var fontAltItalic = new FontFaceObserver('Founders Grotesk Text Web', {
	  weight: 600,
	  style: 'italic'
	});
	var fontBody = new FontFaceObserver('Farnham Text', {
	  weight: 400,
	  style: 'normal'
	});
	var fontBodyItalic = new FontFaceObserver('Farnham Text', {
	  weight: 400,
	  style: 'italic'
	});

	// when fonts are loaded, tell me
	Promise.all([fontTitle.load(), fontHed.load(), fontHedItalic.load(), fontAlt.load(), fontAltItalic.load(), fontBody.load(), fontBodyItalic.load()]).then(function () {
			console.log('Fonts are available.');
		$('html').addClass('fonts-loaded');
		cookie( 'rp-fonts-loaded', 'true', 7 );
		}, 
		function () {
			console.log('Fonts NOT available.');
	});
});