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
    
    // initialize fastclick
    FastClick.attach(document.body);

    // add stylesheets
	if($("#container").size()>0){
	    if (document.createStyleSheet){
	        document.createStyleSheet('/css/rp-app.css');
	    }
	    else {
	        $("head").append($("<link rel='stylesheet' href='/css/rp-app.css' type='text/css' media='screen' />"));
	    }
	}

    // change body class on nav click
	$('#nav-secondary li a').on("click", function( event ){
       event.preventDefault();
	    thisBodyClass = $(this).attr('id');
	    $('body').removeClass().addClass( thisBodyClass ); 
	    $('body').addClass( 'type--b' ); 
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

/*
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
 */
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
	
	// disqus async
	//var dsq = document.createElement('script');
	//dsq.type = 'text/javascript';
	//dsq.async = true;
	//dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
	//(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	
	// disqus lazy load
	var ds_loaded = false, 
    top = $("#disqus_thread").offset().top;
	window.disqus_developer = 1;
	window.disqus_shortname = 'rhymepaysage';
	function check(){
	    if ( !ds_loaded && $(window).scrollTop() + $(window).height() > top ) {
	        $.ajax({
	            type: "GET",
	            url: "http://" + disqus_shortname + ".disqus.com/embed.js",
	            dataType: "script",
	            cache: true
	        });
	        ds_loaded = true;
	    }
	}
	$(window).scroll(check);
	check();
	
});