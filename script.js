document.addEventListener('DOMContentLoaded', () => {
    // Atlas 버튼 클릭 이벤트 처리
    const atlasButton = document.querySelector('.atlas-button a');
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);

    atlasButton.addEventListener('click', (e) => {
        e.preventDefault();
        const targetUrl = atlasButton.getAttribute('href');
        
        // 전환 효과 시작
        pageTransition.classList.add('active');
        
        // 전환 효과가 완료된 후 페이지 이동
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 600); // 전환 효과 시간과 동일하게 설정
    });
}); 