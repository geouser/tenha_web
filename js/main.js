// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


jQuery(document).ready(function($) {

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
      

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('header').toggleClass('active');
        if ($('header').hasClass('active')) {
                $('body, html').css('overflow', 'hidden');
            } else {
                $('body, html').css('overflow', 'visible');
            }
    });



    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });



    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });


    /*-------------------------
                              Video
    -------------------------*/



    /*-------------------------
                              Tabs
    -------------------------*/
    if ( $('.tabs').length > 0 ) {
        $('.tabs').tabs();
    }


     /*-------------------------
                              Audio player
    -------------------------*/
    /*audiojs.events.ready(function() {
        var as = audiojs.createAll();
    });*/

    $('.song .play-btn').on('click', function(event) {
        event.preventDefault();    

        var player = $(this).siblings('audio');
        var customPlayer = $(this).siblings('.player');
        var progressBar = customPlayer.find('.player-progress-bar');
        var progressBarHandle = customPlayer.find('.ui-slider-handle');

        var startTime = 0;
        var currentTime = 0;
        var endTime = player[0].seekable.end(0);


        if ($(this).hasClass('paused')) {
            $('audio').trigger('pause');
            $('.song .play-btn').addClass('paused');
            $('.player').css('visibility', 'hidden');
        }

        customPlayer.css('visibility', 'visible');
        progressBar.attr( 'end-time', endTime );

        if ($(this).hasClass('paused')) {
            player.trigger('play');
        } else {
            player.trigger('pause');
            customPlayer.css('visibility', 'hidden');
        }

        player[0].ontimeupdate=function(){
            currentTime = player[0].currentTime;
            var pos = (currentTime/endTime)*100;
            progressBarHandle.css('left', pos+'%');
        };


        $(this).toggleClass('paused');
    });

    $('.player-progress-bar').slider({
        value: 0,
        change: function( event, ui ) {
            var player = $(this).parent('.player').siblings('audio');
            var val = ui.value;
            var endTime = $(this).attr('end-time');
            player[0].currentTime = (val/100)*endTime;
        }
    });

}); // end file