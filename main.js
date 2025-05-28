document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.atlas-button');
    let posX = 0;
    let posY = 0;
    let speedX = 1.5;
    let speedY = 1.0;
    let directionX = 1;
    let directionY = 1;
    const margin = 0;

  
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close');
    
  
    const strongElements = document.querySelectorAll('.about-text strong');
    

    strongElements.forEach(strong => {
        strong.style.cursor = 'pointer';
        
        strong.addEventListener('click', function() {
         
            const popupText = document.querySelector('.popup-text');
            popupText.innerHTML = `
                <h3>${this.textContent}</h3>
                <p>${this.textContent}에 대한 상세 설명이 여기에 들어갑니다.</p>
            `;
            
          
            popup.style.display = 'block';
        });
    });
    
 
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
    
   
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
    
  
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && popup.style.display === 'block') {
            popup.style.display = 'none';
        }
    });

    function getRandomDirection() {
        return Math.random() > 0.5 ? 1 : -1;
    }

    function moveButton() {
        const buttonRect = button.getBoundingClientRect();
        const maxX = window.innerWidth - buttonRect.width - margin;
        const maxY = window.innerHeight - buttonRect.height - margin;

      
        if (Math.random() < 0.00001) {
            directionX = getRandomDirection();
            directionY = getRandomDirection();
        }

      
        let newX = posX + speedX * directionX;
        let newY = posY + speedY * directionY;

       
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

        posX = newX;
        posY = newY;

       
        button.style.left = `${posX}px`;
        button.style.top = `${posY}px`;
        requestAnimationFrame(moveButton);
    }

  
    posX = (window.innerWidth - button.offsetWidth) / 2;
    posY = (window.innerHeight - button.offsetHeight) / 2;
    button.style.left = `${posX}px`;
    button.style.top = `${posY}px`;

    moveButton();
});