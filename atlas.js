document.addEventListener('DOMContentLoaded', function() {
    // 팝업 요소들
    const sizeGuidePopup = document.getElementById('sizeguidepopup');
    const sizeGuideBtn = document.getElementById('sizeguide');
    const popupCloseBtns = document.querySelectorAll('.popup-close, .objpopup-close');
    const viewportImages = document.querySelectorAll('.viewport-scroll-img a');

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
                const position = getRandomPosition();
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

document.querySelectorAll('.popup-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var popupId = link.getAttribute('href').replace('#', '');
      var popup = document.getElementById(popupId);
      if (popup) {
        popup.style.display = 'block';
      } else {
        console.warn('팝업 id를 찾을 수 없습니다:', popupId);
      }
    });
  });
  
  document.querySelectorAll('.objpopup-close').forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
      var popup = closeBtn.closest('.objpopup');
      if (popup) {
        popup.style.display = 'none';
      }
    });
  });