(function($) {
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
                index: $index,
                bgOpacity: 1,
                showHideOpacity: true
            };

            var lightBox = new PhotoSwipe($pswp, false, items, options);
            lightBox.init();
        });
    });
})(jQuery);
