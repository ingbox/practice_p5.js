(() => {

    var s = skrollr.init();

    var $root = $('html, body');
    var $position = [0, 1000, 2000, 4000];
    var $currentPosition = 0;

    $('.btn-next').click(function(e) {
        e.preventDefault();

        if ($currentPosition < $position.length - 1) {
            $currentPosition++;
        
        $root.animate({
            scrollTop: $position[$currentPosition]
        }, 1000)
    }
    });

    $('.btn-previous').click(function(e) {
        e.preventDefault();

        if ($currentPosition > 0) {
            $currentPosition--;
        
        $root.animate({
            scrollTop: $position[$currentPosition]
        }, 1000)
    }
    });

    // window.addEventListener('scroll',() => {
    //     console.log(window.scrollY);
    // });

    $(window).scroll(function(){
        $currentPosition = getCurrentPosition();
    });

    function getCurrentPosition(){
        var positionNum;
        var scrollAmount = $(document).scrollTop();

        if (scrollAmount >= 4000) {
            positionNum = 3;
        }
        else if (scrollAmount >= 2000) {
            positionNum = 2;
        }
        else if (scrollAmount >= 1000) {
            positionNum = 1;
        }
        else if (scrollAmount >= 0) {
            positionNum = 0;
        }

        console.log(positionNum);
        return positionNum; 
    }
})();