document.addEventListener('DOMContentLoaded', function() {
    // 버튼 요소들
    const atlasButton = document.querySelector('.atlas-button');
    const whatisButton = document.querySelector('.whatis-button');
    
    // 팝업 요소들
    const popup = document.getElementById('whatispopup');
    const popupCloseBtn = document.querySelector('.popup-close');
    const strongElements = document.querySelectorAll('.about-text strong');
    const sizeGuidePopup = document.getElementById('sizeguidepopup');
    const sizeGuideBtn = document.getElementById('sizeguide');

    // Atlas 버튼 위치 관련 변수
    let atlasPosX = 0;
    let atlasPosY = 0;
    let atlasSpeedX = 0.8;
    let atlasSpeedY = 0.8;
    let atlasDirectionX = 1;
    let atlasDirectionY = 1;

    // What is 버튼 위치 관련 변수
    let whatisPosX = 0;
    let whatisPosY = 0;
    let whatisSpeedX = 0.8;
    let whatisSpeedY = 0.8;
    let whatisDirectionX = -1;
    let whatisDirectionY = -1;

    const margin = 0;
    const minDistance = 150;

    // 랜덤 위치 계산 함수
    function getRandomPosition() {
        const popupWidth = 300; // 팝업의 너비
        const popupHeight = 200; // 팝업의 예상 높이
        const maxX = window.innerWidth - popupWidth;
        const maxY = window.innerHeight - popupHeight;
        
        // 화면 가장자리에서 20px 여백을 둠
        const randomX = Math.floor(Math.random() * (maxX - 40)) + 20;
        const randomY = Math.floor(Math.random() * (maxY - 40)) + 20;
        
        return { x: randomX, y: randomY };
    }

    // What is 버튼 클릭 이벤트
    if (whatisButton) {
        whatisButton.addEventListener('click', function(e) {
            e.preventDefault();
            const position = getRandomPosition();
            popup.style.left = `${position.x}px`;
            popup.style.top = `${position.y}px`;
            popup.style.display = 'block';
        });
    }

    // 사이즈 가이드 버튼 클릭 이벤트
    if (sizeGuideBtn) {
        sizeGuideBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const position = getRandomPosition();
            sizeGuidePopup.style.left = `${position.x}px`;
            sizeGuidePopup.style.top = `${position.y}px`;
            sizeGuidePopup.style.display = 'block';
        });
    }

    // 팝업 닫기
    document.querySelectorAll('.popup-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.popup').style.display = 'none';
        });
    });

    // 팝업 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('popup')) {
            event.target.style.display = 'none';
        }
    });

    // ESC 키로 팝업 닫기
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.popup').forEach(popup => {
                if (popup.style.display === 'block') {
                    popup.style.display = 'none';
                }
            });
        }
    });

    // About 텍스트 클릭 이벤트
    if (strongElements.length > 0) {
        strongElements.forEach(strong => {
            strong.style.cursor = 'pointer';
            strong.addEventListener('click', function() {
                const popupText = document.querySelector('.popup-text');
                popupText.innerHTML = `
                    <h3>${this.textContent}</h3>
                    <p>${this.textContent}에 대한 상세 설명이 여기에 들어갑니다.</p>
                `;
                const position = getRandomPosition();
                popup.style.left = `${position.x}px`;
                popup.style.top = `${position.y}px`;
                popup.style.display = 'block';
            });
        });
    }

    function getRandomDirection() {
        return Math.random() > 0.5 ? 1 : -1;
    }

    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    function moveButton(button, posX, posY, speedX, speedY, directionX, directionY, otherPosX, otherPosY) {
        const buttonRect = button.getBoundingClientRect();
        const maxX = window.innerWidth - buttonRect.width - margin;
        const maxY = window.innerHeight - buttonRect.height - margin;

        if (Math.random() < 0.00001) {
            directionX = getRandomDirection();
            directionY = getRandomDirection();
        }

        let newX = posX + speedX * directionX;
        let newY = posY + speedY * directionY;

        // 다른 버튼과의 거리 체크
        const distance = getDistance(newX, newY, otherPosX, otherPosY);
        if (distance < minDistance) {
            if (newX < otherPosX) {
                directionX = -1;
            } else {
                directionX = 1;
            }
            if (newY < otherPosY) {
                directionY = -1;
            } else {
                directionY = 1;
            }
            newX = posX + speedX * directionX;
            newY = posY + speedY * directionY;
        }

        if (newX < margin) {
            newX = margin;
            directionX = 1;
        } else if (newX > maxX) {
            newX = maxX;
            directionX = -1;
        }

        if (newY < margin) {
            newY = margin;
            directionY = 1;
        } else if (newY > maxY) {
            newY = maxY;
            directionY = -1;
        }

        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;

        return { newX, newY, directionX, directionY };
    }

    function animate() {
        // Atlas 버튼 이동
        const atlasResult = moveButton(atlasButton, atlasPosX, atlasPosY, atlasSpeedX, atlasSpeedY, atlasDirectionX, atlasDirectionY, whatisPosX, whatisPosY);
        atlasPosX = atlasResult.newX;
        atlasPosY = atlasResult.newY;
        atlasDirectionX = atlasResult.directionX;
        atlasDirectionY = atlasResult.directionY;

        // What is 버튼 이동
        const whatisResult = moveButton(whatisButton, whatisPosX, whatisPosY, whatisSpeedX, whatisSpeedY, whatisDirectionX, whatisDirectionY, atlasPosX, atlasPosY);
        whatisPosX = whatisResult.newX;
        whatisPosY = whatisResult.newY;
        whatisDirectionX = whatisResult.directionX;
        whatisDirectionY = whatisResult.directionY;

        requestAnimationFrame(animate);
    }

    // 초기 위치 설정
    atlasPosX = (window.innerWidth - atlasButton.offsetWidth) / 4;
    atlasPosY = (window.innerHeight - atlasButton.offsetHeight) / 4;
    atlasButton.style.left = `${atlasPosX}px`;
    atlasButton.style.top = `${atlasPosY}px`;

    whatisPosX = (window.innerWidth - whatisButton.offsetWidth) * 3/4;
    whatisPosY = (window.innerHeight - whatisButton.offsetHeight) * 3/4;
    whatisButton.style.left = `${whatisPosX}px`;
    whatisButton.style.top = `${whatisPosY}px`;

    animate();
});