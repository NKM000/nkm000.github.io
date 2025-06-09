document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const profileImage = document.querySelector('.profile-section .image-placeholder.circle');

    // 函數：生成隨機的移動和縮放值
    function getRandomTransform() {
        const maxX = window.innerWidth * 1.5; // 可以跑到畫面外1.5倍的寬度
        const maxY = window.innerHeight * 1.5; // 可以跑到畫面外1.5倍的高度
        const minScale = 0.5;
        const maxScale = 2.0;

        const randomX = (Math.random() * maxX * 2) - maxX; // 隨機正負值
        const randomY = (Math.random() * maxY * 2) - maxY;
        const randomScale = Math.random() * (maxScale - minScale) + minScale;
        const randomRotate = Math.random() * 360; // 0-360度旋轉

        return `translate(${randomX}px, ${randomY}px) scale(${randomScale}) rotate(${randomRotate}deg)`;
    }

    // 函數：讓圖片開始亂跑
    function startChaos(element) {
        // 儲存原始樣式，以便之後恢復
        if (!element.dataset.originalStyle) {
            element.dataset.originalStyle = element.style.cssText;
        }

        element.classList.add('chaos-mode'); // 添加一個標記class
        element.style.transition = 'transform 3s ease-in-out'; // 更平滑的動畫
        element.style.position = 'absolute'; // 確保可以自由定位
        element.style.zIndex = '1000'; // 讓它在最上層

        // 啟動一個Interval，每隔一段時間改變位置和大小
        element.chaosInterval = setInterval(() => {
            element.style.transform = getRandomTransform();
        }, 3000); // 每3秒換一次位置和大小
    }

    // 函數：讓圖片回到原位
    function stopChaos(element) {
        if (element.chaosInterval) {
            clearInterval(element.chaosInterval); // 停止interval
            element.chaosInterval = null;
        }
        element.classList.remove('chaos-mode'); // 移除標記class
        element.style.transition = 'transform 0.5s ease-out'; // 回歸時的過渡效果
        element.style.transform = 'none'; // 移除所有transform
        element.style.position = 'relative'; // 恢復相對定位
        element.style.zIndex = 'auto'; // 恢復z-index
        // 如果有儲存原始樣式，可以考慮恢復，但通常transform: 'none'就夠了
        // if (element.dataset.originalStyle) {
        //     element.style.cssText = element.dataset.originalStyle;
        // }
    }

    // 為所有作品集圖片添加點擊事件
    portfolioItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // 阻止事件冒泡，避免點擊子元素時重複觸發
            event.stopPropagation();
            if (item.classList.contains('chaos-mode')) {
                stopChaos(item);
            } else {
                startChaos(item);
            }
        });
    });


    // 點擊頁面其他地方時停止所有正在亂跑的圖片
    document.body.addEventListener('click', () => {
        portfolioItems.forEach(item => {
            if (item.classList.contains('chaos-mode')) {
                stopChaos(item);
            }
        });
        if (profileImage && profileImage.classList.contains('chaos-mode')) {
            stopChaos(profileImage);
        }
    });
});