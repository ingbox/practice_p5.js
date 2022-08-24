(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 함수
    let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 섹션 합
    let currentScene = 0; // 현재 Scene
    let enterNewScene = false; // 새로운 Scene에 진입한 순간 true
    let acc = 0.1;
    let delayedYOffset = 0;
    let rafId;
    let rafState;

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
            container: document.querySelector('#scroll-section-1'),
            content: document.querySelector('#scroll-section-1 .description')
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
            canvas_scale: [0, 0, {start: 0, end: 0}],
            canvasCaption_opacity : [0, 1, {start: 0, end: 0}],
            canvasCaption_translateY: [20, 0, {start: 0, end: 0}],
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

    // Menu Sticky 처리
    function checkMenu() {
        if (yOffset > 44) {
            document.body.classList.add('local-nav-sticky');
        } else {
            document.body.classList.remove('local-nav-sticky');
        }
    }

    function setLayout() {
        for(let i = 0; i < sceneInfo.length; i++){
            if (sceneInfo[i].type === 'sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if (sceneInfo[i].type === 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.content.offsetHeight + window.innerHeight * 0.5;
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
        // console.log(scrollHeight);
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3) {
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
                // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
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
            case 2:

                // let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

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

                    objs.context.fillRect(
                        parseInt(values.rect1X[0]),
                        0,
                        parseInt(whiteRectWidth),
                        objs.canvas.height
                        );

                    objs.context.fillRect(
                        parseInt(values.rect2X[0]),
                        0,
                        parseInt(whiteRectWidth),
                        objs.canvas.height
                        );
                  }

                break;
            case 3:
                  const widthRatio = window.innerWidth / objs.canvas.width;
                  const heightRatio = window.innerHeight / objs.canvas.height;
                  let canvasScaleRatio;
                  console.log("width:",widthRatio);
                  console.log("height:",heightRatio);

                // 비율이 더 큰 것을 Scale 처리를 해주어야지 이미지가 꽉차게 보임
                // 만약 작은 것을 곱하게 되면 예를 들어 HeightScale: 800 / 1000(약 1080) WidthScale: 1400 / 2000(약 1920)
                // 원래 1000 2000 사이즈 이미지에 Widthscale인 0.7을 곱해주게되면 Height가 700이되고
                // 800보다 100작은 값이므로 화면을 꽉채우지 못함
                // 반면 큰 Scale인 800을 곱해주게되면 이미 Width가 넓은 Canvas이기 때문에 꽉 찰 수 밖에 없음
                // 만약에 HeightScale: 700 / 1000 WidthScale: 1500 / 2000 일때는 widthScale 값인 0.75을 곱해주면 사이즈가 맞음
                  if (widthRatio <= heightRatio){
                    // 캔버스보다 브라우저가 홀쭉할 때 이미지는 세로로 꽉차게 됨 비율이 Height가 더 줄었기 떄문에 0.575 < 0.58 크면 전체 대비 적게 준거니까
                    // 원래 꽉찬 캔버스 이미지를 큰거에 맞추면 어짜피 위가 잘리든 아래가 잘리든 꽉차긴 하니까
                    canvasScaleRatio = heightRatio;
                  } else {
                     // 캔버스보다 브라우저가 납짝할 때 이미지는 가로로 꽉차게 됨
                    canvasScaleRatio = widthRatio;
                  }
                //   console.log(widthRatio <= heightRatio);

                  objs.canvas.style.transform = `scale(${canvasScaleRatio})`; // 큰 Ratio에 Fit되도록 처리
                  objs.context.fillStyle = 'white';
                  objs.context.drawImage(objs.images[0],0, 0);
                

                  const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
                  console.log(recalculatedInnerWidth);
                  // 세로가 더 길때는 canvas의 사이즈를 세로 Ratio로 scale 해야하니까
                  const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
                  // console.log(recalculatedInnerHeight);
                  // recalculatedInnerHeight 같은 경우는 그냥 다시 canvasSize가 됨

                  if (!values.rectStartY) { // 값이 없으면
                    // values.rectStartY = objs.canvas.getBoundingClientRect().top;
                    values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
                    // console.log(objs.canvas.offsetTop);
                    // 박스 이동
                    values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect1X[2].end = values.rectStartY / scrollHeight;
                    values.rect2X[2].end = values.rectStartY / scrollHeight;
                  }
                  // Rect 15% 정도 차지
                  const whiteRectWidth = recalculatedInnerWidth * 0.15;
                  values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2; // objs.canvas.width는 1920 고정값이기 때문에 다시 계산된 넓이를 뺀다음 1/2를 하면 시작 값
                  values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
                  values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                  values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

                //   objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                //   objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
                  //흰색 박스 그리기
                  objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);
                  objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);

                  if (scrollRatio < values.rect1X[2].end) { // end의 시점은 canvas의 Top이 딱 맞았을 때 보다 scrollRatio가 작으면 canvas 이전 상태
                    // 시점 1
                    objs.canvas.classList.remove('sticky');
                  } else {
                    // 이미지 블랜드 실행
                    // 시점 2

                    values.blendHeight[0] = 0;
                    values.blendHeight[1] = objs.canvas.height;
                    values.blendHeight[2].start = values.rect1X[2].end; // 사각형이 모두 보여졌을 때 시작
                    values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
                    const blendHeight = calcValues(values.blendHeight, currentYOffset);

                    objs.context.drawImage(objs.images[1],
                                            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
                                            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight
                                            );
                    objs.canvas.classList.add('sticky');
                    objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

                    if (scrollRatio > values.blendHeight[2].end) {
                        values.canvas_scale[0] = canvasScaleRatio; // 이미 scale 처리를 해줬었음
                        values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width);// Scale 최종 값
                        values.canvas_scale[2].start = values.blendHeight[2].end;
                        values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                        objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                        objs.canvas.style.marginTop = 0;
                    }

                    if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) { // 초기값이 0이니까 current_Scene 바로 시작 방지
                        objs.canvas.classList.remove('sticky');
                        objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

                        values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
                        values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
                        objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);

                        values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].start;
						values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;
                        objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;
                    } else {
                        objs.canvasCaption.style.opacity = values.canvasCaption_opacity[0];
                    }
                  }
                break;
        }
    }

    // 스크롤 easing 처리
    function scrollLoop(){
        enterNewScene = false;
        prevScrollHeight = 0;

        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        } // 현재 Scene 번호만큼 scrollHeight 반복

        if (delayedYOffset < prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            document.body.classList.remove('scroll-effect-end');
        }

        if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            // 마지막 section에서
			if (currentScene === sceneInfo.length - 1) {
				document.body.classList.add('scroll-effect-end');
			}
			if (currentScene < sceneInfo.length - 1) {
				currentScene++;
			}
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        } // 넘어갈 때 이게 먼저 발동되므로 바로 currentScene 적용 가능

        if (delayedYOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (enterNewScene) return;

        playAnimation();

    }

    function loop() {

        delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

        if (!enterNewScene) { // 바뀌는 순간 무시
            if (currentScene === 0 || currentScene === 2){
                const currentYOffset = delayedYOffset - prevScrollHeight;
                const values = sceneInfo[currentScene].values;
                const objs = sceneInfo[currentScene].objs;
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                if (objs.videoImages[sequence]){
                    objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                }
            }
        }

     
        // console.log("delayed:", delayedYOffset);

        // console.log("yoffset:", yOffset);
        // box.style.width = `${delayedYOffset}`;
        // console.log((yOffset - delayedYOffset));

              // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
        // 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행
        if (delayedYOffset < 1) {
            scrollLoop();
            sceneInfo[0].objs.canvas.style.opacity = 1;
            sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
        }
        // 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결
        if ((document.body.offsetHeight - window.innerHeight) - delayedYOffset < 1) {
            let tempYOffset = yOffset;
            scrollTo(0, tempYOffset - 1);
        }

        rafId = requestAnimationFrame(loop);

        if ( Math.abs(yOffset - delayedYOffset) < 1) {
            cancelAnimationFrame(rafId);
            rafState = false;
        }
    }

    window.addEventListener('load', () => {
        setLayout();
        document.body.classList.remove('before-load'); // 로딩 처리
        // document.body.removeChild(document.querySelector('.loading')); 바로 없어져서 트랜지션이 걸린 객체에 이벤트 처리
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);


        let tempYOffset = yOffset;
        let tempScrollCount = 0;

        if (tempYOffset > 0) {
        let siId = setInterval(() => {
            scrollTo(0, tempYOffset);
            tempYOffset += 1;
            if (tempScrollCount > 2){
                clearInterval(siId);
            }
            tempScrollCount++;
        }, 20);
    }
        window.addEventListener('scroll', () => {
            yOffset = window.pageYOffset;
            scrollLoop();
            checkMenu();
    
            if(!rafState) {
                rafId = requestAnimationFrame(loop);
                rafState = true;
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) {
                // setLayout();
                // sceneInfo[3].values.rectStartY = 0; // 초기화 리사이즈 대응
                window.location.reload();
            }
        }); 
    
        window.addEventListener('orientationchange', () => { 
            scrollTo(0, 0);
            setTimeout(() =>{
                window.location.reload();
            }, 500);
        }); // orientationchange 모바일 방향
        document.querySelector('.loading').addEventListener('transitionend', (e) => {
            // console.log(e.currentTarget);
            document.body.removeChild(e.currentTarget);
        });
    });

    setCanvasImages();
})();