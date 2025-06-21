document.addEventListener('DOMContentLoaded', function() {
    // 팝업 요소들
    const sizeGuidePopup = document.getElementById('sizeguidepopup');
    const sizeGuideBtn = document.getElementById('sizeguide');
    const popupCloseBtns = document.querySelectorAll('.popup-close, .objpopup-close');
    const viewportImages = document.querySelectorAll('.viewport-scroll-img a');

    // 랜덤 위치 계산 함수
    function getRandomPosition(popupWidth, popupHeight) {
        // 화면 안에서만 랜덤 위치
        const maxX = window.innerWidth - popupWidth;
        const maxY = window.innerHeight - popupHeight;
        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);
        return { x, y };
    }

    function getNonOverlappingPositions(width1, height1, width2, height2, minDistance) {
        // 첫 번째 팝업 위치
        const pos1 = getRandomPosition(width1, height1);

        let pos2, tries = 0;
        do {
            pos2 = getRandomPosition(width2, height2);
            tries++;
            // 두 팝업의 중심 사이 거리 계산
            const dx = (pos1.x + width1/2) - (pos2.x + width2/2);
            const dy = (pos1.y + height1/2) - (pos2.y + height2/2);
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist > minDistance) break;
        } while (tries < 100);

        return [pos1, pos2];
    }

    // 사이즈 가이드 버튼 클릭 이벤트
    sizeGuideBtn.addEventListener('click', function(e) {
        e.preventDefault();
        sizeGuidePopup.style.display = 'block';
    });

    // 뷰포트 이미지 클릭 이벤트
    viewportImages.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const popupId = this.getAttribute('href').substring(1); // # 제거
            const popup = document.getElementById(popupId);
            
            if (popup && popup.classList.contains('objpopup')) {
                const position = getRandomPosition(300, 200);
                popup.style.left = `${position.x}px`;
                popup.style.top = `${position.y}px`;
                popup.style.display = 'block';
            } else if (popup) {
                popup.style.display = 'block';
            }
        });
    });

    // 팝업 닫기
    popupCloseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const popup = this.closest('.popup, .sgpopup, .objpopup');
            popup.style.display = 'none';
        });
    });

    // 팝업 외부 클릭 시 닫기
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('popup') || 
            event.target.classList.contains('sgpopup') || 
            event.target.classList.contains('objpopup')) {
            event.target.style.display = 'none';
        }
    });

    // ESC 키로 팝업 닫기
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.popup, .sgpopup, .objpopup').forEach(popup => {
                popup.style.display = 'none';
            });
        }
    });
}); 

function getRandomPositionForPopup(popupElem) {
    // 팝업을 잠깐 보이게 해서 크기 측정
    popupElem.style.visibility = 'hidden';
    popupElem.style.display = 'block';
    const rect = popupElem.getBoundingClientRect();
    const popupWidth = rect.width;
    const popupHeight = rect.height;
    // 다시 숨김
    popupElem.style.display = 'none';
    popupElem.style.visibility = '';

    const maxX = window.innerWidth - popupWidth;
    const maxY = window.innerHeight - popupHeight;
    const x = Math.max(0, Math.floor(Math.random() * maxX));
    const y = Math.max(0, Math.floor(Math.random() * maxY));
    return { x, y };
}

document.querySelectorAll('.popup-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    var popupId = link.getAttribute('href').replace('#', '');

    var popup = document.getElementById(popupId);
    var linkPopup = document.getElementById('link-popup');

    // 설명 팝업 위치 랜덤
    if (popup) {
      const pos1 = getRandomPositionForPopup(popup);
      popup.style.left = pos1.x + 'px';
      popup.style.top = pos1.y + 'px';
      popup.style.display = 'block';
    }

    // 링크 팝업 내용 및 위치 랜덤
    if (linkPopup && youtubeLinks[popupId]) {
      document.getElementById('link-popup-iframe').src =
        "https://www.youtube.com/embed/" + youtubeLinks[popupId].videoId;
      const pos2 = getRandomPositionForPopup(linkPopup);
      linkPopup.style.left = pos2.x + 'px';
      linkPopup.style.top = pos2.y + 'px';
      linkPopup.style.display = 'block';
    }
  });
});
  
document.querySelectorAll('.objpopup-close').forEach(function(closeBtn) {
  closeBtn.addEventListener('click', function() {
    var popup = closeBtn.closest('.objpopup');
    if (popup) {
      popup.style.display = 'none';
      if (popup.id === 'link-popup') {
        document.getElementById('link-popup-iframe').src = '';
      }
    }
  });
});

const youtubeLinks = {
  basketball: {
    videoId: "x3pslzuwSlc"
  },
  micro: {
    videoId: "wCrtk-pyP0I"
  },
  match: {
    videoId: "xWLrbV_PyJ8"
  },
  ant: {
    videoId: "6DqLC-Z8rAo"
  },
  sand: {
    videoId: "BMq7LaoOkB4"
  },
  blood: {
    videoId: "hRnrIpUMyZQ"
  },
  x: {
    videoId: "l078P6eqXqQ"
  },
  bacteriophage: {
    videoId: "YAy4MxRnPYY"
  },
  dna: {
    videoId: "LA1IaBH7qUY"
  },
  c: {
    videoId: "-T-k9e5L1Oo"
  },
  gamma: {
    videoId: "Cyt_fy59Vys"
  },
  He: {
    videoId: "FeLB7ab91iw"
  },
  proton: {
    videoId: "3rGK80zQzXg"
  },
  neutron: {
    videoId: "2yBrRx7ho1s"
  },
  up: {
    videoId: "0tJ6MSLE1EI"
  },
  down: {
    videoId: "wKi9K_HJJvY"
  },
  string: {
    videoId: "Da-2h2B4faU"
  }
};

function makePopupDraggable(popupElem) {
    let isDragging = false;
    let offsetX = 0, offsetY = 0;

    // 팝업의 상단(제목줄 등)을 잡고 드래그할 수 있게 하려면
    // popupElem 전체가 아니라 popupElem.querySelector('.objpopup-title') 등으로 바꿔도 됩니다.
    popupElem.addEventListener('mousedown', function(e) {
        // 팝업 내부의 버튼 등 클릭 시 드래그 방지
        if (e.target.classList.contains('objpopup-close')) return;
        isDragging = true;
        // 클릭한 곳과 팝업의 좌상단 거리
        offsetX = e.clientX - popupElem.offsetLeft;
        offsetY = e.clientY - popupElem.offsetTop;
        popupElem.style.zIndex = 2000; // 드래그 중 맨 위로
        document.body.style.userSelect = 'none'; // 텍스트 선택 방지
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        popupElem.style.left = (e.clientX - offsetX) + 'px';
        popupElem.style.top = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            popupElem.style.zIndex = 1000;
            document.body.style.userSelect = '';
        }
    });
}

// 모든 objpopup에 드래그 기능 적용
document.querySelectorAll('.objpopup').forEach(makePopupDraggable);