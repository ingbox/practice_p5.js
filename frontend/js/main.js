(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 함수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 섹션 합
    let currentScene = 0; // 현재 Scene
    let enterNewScene = false; // 새로운 Scene에 진입한 순간 true

    const sceneInfo = [{
        type: 'sticky',
        heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
            container: document.querySelector('#scroll-section-0'),
            messageA: document.querySelector('#scroll-section-0 .main-message.a'),
            messageB: document.querySelector('#scroll-section-0 .main-message.b'),
            messageC: document.querySelector('#scroll-section-0 .main-message.c'),
            messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            canvas: document.querySelector('#scroll-section-0 #video-canvas-0'),
            context: document.querySelector('#scroll-section-0 #video-canvas-0').getContext('2d'),
            videoImages: []
        },
        values: {
            videoImageCount: 229,
            imageSequence: [0, 228],
            canvas_opacity: [1, 0, {start: 0.9, end: 1}],
            messageA_opacity_in: [0, 1, {start: 0.1, end: 0.2}],
            messageA_opacity_out: [1, 0, {start: 0.25, end: 0.3}],
            messageA_translateY_in: [20, 0, {start: 0.1, end: 0.2}],
            messageA_translateY_out: [0, -20, {start: 0.25, end: 0.3}],
            messageB_opacity_in: [0, 1, {start: 0.3, end: 0.4}],
            messageB_opacity_out: [1, 0, {start: 0.45, end: 0.5}],
            messageB_translateY_in: [20, 0, {start: 0.3, end: 0.4}],
            messageB_translateY_out: [0, -20, {start: 0.45, end: 0.5}],
            messageC_opacity_in: [0, 1, {start: 0.5, end: 0.6}],
            messageC_opacity_out: [1, 0, {start: 0.65, end: 0.7}],
            messageC_translateY_in: [20, 0, {start: 0.5, end: 0.6}],
            messageC_translateY_out: [0, -20, {start: 0.65, end: 0.7}],
            messageD_opacity_in: [0, 1, {start: 0.7, end: 0.8}],
            messageD_opacity_out: [1, 0, {start: 0.85, end: 0.9}],
            messageD_translateY_in: [20, 0, {start: 0.7, end: 0.8}],
            messageD_translateY_out: [0, -20, {start: 0.85, end: 0.9}]
        }
    },
    {
        type: 'normal',
        scrollHeight: 0,
        objs: {
            container: document.querySelector('#scroll-section-1')
        }
    },
    {
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            container: document.querySelector('#scroll-section-2'),
            messageA: document.querySelector('#scroll-section-2 .a'),
            messageB: document.querySelector('#scroll-section-2 .b'),
            messageC: document.querySelector('#scroll-section-2 .c'),
            pinB: document.querySelector('#scroll-section-2 .b .pin'),
            pinC: document.querySelector('#scroll-section-2 .c .pin'),
            canvas: document.querySelector('#scroll-section-2 #video-canvas-1'),
            context: document.querySelector('#scroll-section-2 #video-canvas-1').getContext('2d'),
            videoImages: []
        },
        values: {
            videoImageCount: 172,
            imageSequence: [0, 171],
            canvas_opacity_in: [0, 1, {start: 0, end: 0.1}],
            canvas_opacity_out: [1, 0, {start: 0.95, end: 1}],
            messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
            messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
            messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
            messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
            messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
            messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
            messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
            messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
            messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
            messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
            messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
            messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
            pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
            pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
            pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
            pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
            pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
            pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        }

    },
    {
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
            container: document.querySelector('#scroll-section-3'),
            canvasCaption: document.querySelector('.canvas-caption'),
            canvas: document.querySelector('.image-blend-canvas'),
            context: document.querySelector('.image-blend-canvas').getContext('2d'),
            imagePath: ['./img3/section3-1.jpg','./img3/section3-2.jpg'],
            images: []
        },
        values: {
            rect1X: [0, 0, {start: 0, end: 0}],
            rect2X: [0, 0, {start: 0, end: 0}],
            blendHeight: [0, 0, {start: 0, end: 0}],
            rectStartY: 0
        }
    }];

    function setCanvasImages() {
        let imgElem;
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++){
            imgElem = new Image();
            imgElem.src = `./img/scene (${i}).png`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }
        let imgElem2;
        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++){
            imgElem2 = new Image();
            imgElem2.src = `./img2/scene (${i}).png`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }

        let imgElem3;
        for (let i = 0; i < sceneInfo[3].objs.imagePath.length; i++){
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imagePath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }
        // console.log(sceneInfo[3].objs.images);

    }

    setCanvasImages();

    function setLayout() {
        for(let i = 0; i < sceneInfo.length; i++){
            if (sceneInfo[i].type ==='sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if (sceneInfo[i].type === 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++){
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id',`show-scene-${currentScene}`);

        const heightRatio = window.innerHeight / 1080;
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    function calcValues(values, currentYOffset) {
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length == 3) {
            // start ~ end 사이의 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;
           

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
            rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            }
            else if (currentYOffset < partScrollStart){
                rv = values[0];
            }
            else if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }

        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }
        return rv;
    }

    function playAnimation() {

        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene) {
            case 0:

                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

                if (scrollRatio <= 0.22){
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                  
                } else {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                   
                }

                if (scrollRatio <= 0.42){
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                   
                } else {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    // objs.messageB.style.color = '#D3D3D3';
                }

                if (scrollRatio <= 0.62){
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.82){
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }

                break;
            case 1:
                break;
            case 2:

                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

                if (scrollRatio <= 0.5){
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
                } else {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
                }

                if (scrollRatio <= 0.25){
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.565){
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }

                if (scrollRatio <= 0.81) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in,currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                  } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                  }

                  // case 3 copy pre-load
                  if (scrollRatio > 0.9) {
                    const objs = sceneInfo[3].objs;
                    const values = sceneInfo[3].values;
                    const widthRatio = window.innerWidth / objs.canvas.width;
                    const heightRatio = window.innerHeight / objs.canvas.height;
                    let canvasScaleRatio;
                    
  
                    if (widthRatio <= heightRatio){
                      canvasScaleRatio = heightRatio;
                    } else {
                      canvasScaleRatio = widthRatio;
                    }

                    objs.canvas.style.transform = `scale(${canvasScaleRatio})`; // 큰 Ratio에 Fit되도록 처리
                    objs.context.fillStyle = 'white';
                    objs.context.drawImage(objs.images[0], 0, 0);

                    const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                    const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

                    const whiteRectWidth = recalculatedInnerWidth * 0.15;
                    values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                    values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                    values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                    values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

                    objs.context.fillRect(parseInt(values.rect1X[0]), 0, parseInt(whiteRectWidth), objs.canvas.height);
                    objs.context.fillRect(parseInt(values.rect2X[0]), 0, parseInt(whiteRectWidth), objs.canvas.height);

                  }

                break;
            case 3:
                  let step = 0;
                  const widthRatio = window.innerWidth / objs.canvas.width;
                  const heightRatio = window.innerHeight / objs.canvas.height;
                  let canvasScaleRatio;
                  

                  if (widthRatio <= heightRatio){
                    canvasScaleRatio = heightRatio;
                  } else {
                    canvasScaleRatio = widthRatio;
                  }

                  objs.canvas.style.transform = `scale(${canvasScaleRatio})`; // 큰 Ratio에 Fit되도록 처리
                  objs.context.fillStyle = 'white';
                  objs.context.drawImage(objs.images[0],0, 0);

                  const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                  const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

                  if (!values.rectStartY) {
                    // values.rectStartY = objs.canvas.getBoundingClientRect().top;
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
                    // 박스 이동
                    values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect1X[2].end = values.rectStartY / scrollHeight;
                    values.rect2X[2].end = values.rectStartY / scrollHeight;
                  }
          

                  const whiteRectWidth = recalculatedInnerWidth * 0.15;
                  values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
                  values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                  values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                  values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

                //   objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                //   objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);

                  objs.context.fillRect(calcValues(values.rect1X, currentYOffset), 0, parseInt(whiteRectWidth), objs.canvas.height);
                  objs.context.fillRect(calcValues(values.rect2X, currentYOffset), 0, parseInt(whiteRectWidth), objs.canvas.height);
                  console.log(scrollRatio);
                  console.log(values.rect1X[2].end);

                  if (scrollRatio < values.rect1X[2].end) { // end의 시점은 canvas의 Top이 딱 맞았을 때 보다 scrollRatio가 작으면 canvas 이전 상태
                    step = 1;
                    objs.canvas.classList.remove('sticky');
                  } else {
                    step = 2;
                    // 이미지 블랜드 실행

                    values.blendHeight[0] = 0;
                    values.blendHeight[1] = objs.canvas.height;
                    values.blendHeight[2].start = values.rect1X[2].end; // 사각형이 모두 보여졌을 때 시작
                    values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
                    const blendHeight = calcValues(values.blendHeight, currentYOffset);

                    objs.context.drawImage(objs.images[1], 0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
                                                            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight);
                    
                    objs.canvas.classList.add('sticky');
                    objs.canvas.style.top= `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;
                  }
                break;
        }
    }

   

    function scrollLoop(){
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
        } // 현재 Scene 번호만큼 scrollHeight 반복

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        } // 넘어갈 때 이게 먼저 발동되므로 바로 currentScene 적용 가능

        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene == 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        // console.log(window.pageYOffset);
    

        if (enterNewScene == true) return;

        playAnimation();

    }

    window.addEventListener('load', () => {
        setLayout(); 
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    });
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    

    setLayout();
})();