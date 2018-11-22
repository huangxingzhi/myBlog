jQuery(document).ready(function($) {
    var slidesWrapper = $('.cd-hero-slider');
    if (slidesWrapper.length > 0) {
        var primaryNav = $('.cd-primary-nav'),
            sliderNav = $('.cd-slider-nav'),
            navigationMarker = $('.cd-marker'),
            slidesNumber = slidesWrapper.children('li').length,
            visibleSlidePosition = 0,
            autoPlayId,
            autoPlayDelay = 5000;
        uploadVideo(slidesWrapper);
        setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
        primaryNav.on('click',
            function(event) {
                if ($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible')
            });
        sliderNav.on('click', 'li',
            function(event) {
                event.preventDefault();
                var selectedItem = $(this);
                if (!selectedItem.hasClass('selected')) {
                    var selectedPosition = selectedItem.index(),
                        activePosition = slidesWrapper.find('li.selected').index();
                    if (activePosition < selectedPosition) {
                        nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition)
                    } else {
                        prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition)
                    }
                    visibleSlidePosition = selectedPosition;
                    updateSliderNavigation(sliderNav, selectedPosition);
                    updateNavigationMarker(navigationMarker, selectedPosition + 1);
                    setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay)
                }
            })
    }
    function nextSlide(visibleSlide, container, pagination, n) {
        visibleSlide.removeClass('selected').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function() {
                visibleSlide.removeClass('is-moving')
            });
        container.children('li').eq(n).addClass('selected');
        checkVideo(visibleSlide, container, n)
    }
    function prevSlide(visibleSlide, container, pagination, n) {
        visibleSlide.removeClass('selected').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function() {
                visibleSlide.removeClass('is-moving')
            });
        container.children('li').eq(n).addClass('selected');
        checkVideo(visibleSlide, container, n)
    }
    function updateSliderNavigation(pagination, n) {
        var navigationDot = pagination.find('.selected');
        navigationDot.removeClass('selected');
        pagination.find('li').eq(n).addClass('selected')
    }
    function setAutoplay(wrapper, length, delay) {
        if (wrapper.hasClass('autoplay')) {
            clearInterval(autoPlayId);
            autoPlayId = window.setInterval(function() {
                    autoplaySlider(length)
                },
                delay)
        }
    }
    function autoplaySlider(length) {
        if (visibleSlidePosition < length - 1) {
            nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
            visibleSlidePosition += 1
        } else {
            prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
            visibleSlidePosition = 0
        }
        updateNavigationMarker(navigationMarker, visibleSlidePosition + 1);
        updateSliderNavigation(sliderNav, visibleSlidePosition)
    }
    function uploadVideo(container) {
        var i = 0;
        container.find('.cd-bg-video-wrapper').each(function() {
            var videoWrapper = $(this);
            if (videoWrapper.is(':visible')) {
                var videoUrl = videoWrapper.data('video'),
                    video = $('<video loop><source src="' + videoUrl + '.mp4" type="video/mp4" /></video>');
                if (i == 0) {
                    video = $('<video autoplay loop><source src="' + videoUrl + '.mp4" type="video/mp4" /></video>')
                }
                video.appendTo(videoWrapper);
                if (videoWrapper.parent('.cd-bg-video.selected').length > 0) video.get(0).play();
                i++
            }
        })
    }
    function checkVideo(hiddenSlide, container, n) {
        var hiddenVideo = hiddenSlide.find('video');
        if (hiddenVideo.length > 0) hiddenVideo.get(0).pause();
        var visibleVideo = container.children('li').eq(n).find('video');
        if (visibleVideo.length > 0) visibleVideo.get(0).play()
    }
    function updateNavigationMarker(marker, n) {
        marker.removeClassPrefix('item').addClass('item-' + n)
    }
    $.fn.removeClassPrefix = function(prefix) {
        this.each(function(i, el) {
            var classes = el.className.split(" ").filter(function(c) {
                return c.lastIndexOf(prefix, 0) !== 0
            });
            el.className = $.trim(classes.join(" "))
        });
        return this
    }
});