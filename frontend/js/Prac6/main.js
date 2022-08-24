(() => {

    const actions = {
        birdFlies(key) {
            if(key) {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },

        birdFlies2(key) {
            if(key) {
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.7}px)`;
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    };

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; // 현재 활성화된 visible class가 붙은 .graphic-item 지정하는 변수
    let ioIndex;

    // 전부 for문이 돌지 않고 앞과 뒤의 요소만 돌게 하게
    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1;
    });


    for (let i = 0; i < stepElems.length; i++){
        io.observe(stepElems[i]); // 모든 stepElems를 관찰할것
        // stepElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.index = i; // 말풍선
        graphicElems[i].dataset.index = i; // 이미지
    }

    function activate(action) {
        currentItem.classList.add('visible');
        if (action) {
            actions[action](true);
        }
    }

    function inactivate(action) {
        currentItem.classList.remove('visible');
        if (action) {
            actions[action](false);
        }
    }
    // window.addEventListener('load', () => {

    // })

    window.addEventListener('scroll',() => {
        let step;
        let boundingRect;
        let temp = 0;
        //
        for (let i = ioIndex - 1; i < ioIndex + 2; i++){
            step = stepElems[i];
            if (!step) continue;
            boundingRect = step.getBoundingClientRect(); // 창 안에서의 Y값
            // console.log(boundingRect);

            if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                console.log(step.dataset.index);

                inactivate(currentItem.dataset.action);
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
    });

    window.addEventListener('load',() => {
        setTimeout(() => {scrollTo(0, 0);} , 100);

    });

    activate(); 
})();