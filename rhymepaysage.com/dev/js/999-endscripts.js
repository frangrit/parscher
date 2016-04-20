$(document).ready(function(){

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
});

