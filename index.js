document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const profileImage = document.querySelector('.profile-section .image-placeholder.circle'); // 個人圖片

    // 只有作品集圖片參與交換
    const swappablePortfolioImages = Array.from(portfolioItems); // 轉換為數組，只包含作品集圖片

    // 函數：交換兩個元素的內容（圖片和文字）
    function swapContent(element1, element2) {
        // 暫存 element1 的內容
        const tempImgSrc = element1.querySelector('img') ? element1.querySelector('img').src : null;
        const tempImgAlt = element1.querySelector('img') ? element1.querySelector('img').alt : null;
        const tempSpanText = element1.querySelector('span') ? element1.querySelector('span').textContent : '';

        // 將 element2 的內容賦給 element1
        if (element1.querySelector('img') && element2.querySelector('img')) {
            element1.querySelector('img').src = element2.querySelector('img').src;
            element1.querySelector('img').alt = element2.querySelector('img').alt;
        }
        if (element1.querySelector('span') && element2.querySelector('span')) {
            element1.querySelector('span').textContent = element2.querySelector('span').textContent;
        }

        // 將暫存的 element1 內容賦給 element2
        if (element2.querySelector('img') && tempImgSrc) {
            element2.querySelector('img').src = tempImgSrc;
            element2.querySelector('img').alt = tempImgAlt;
        }
        if (element2.querySelector('span') && tempSpanText !== null) {
            element2.querySelector('span').textContent = tempSpanText;
        }
    }

    // 為所有作品集圖片添加點擊事件（個人圖片不在此列）
    swappablePortfolioImages.forEach(item => {
        item.addEventListener('click', () => {
            // 隨機選擇另一個不同的作品集圖片
            let randomIndex;
            let targetItem;

            do {
                randomIndex = Math.floor(Math.random() * swappablePortfolioImages.length);
                targetItem = swappablePortfolioImages[randomIndex];
            } while (targetItem === item); // 確保選中的不是自己

            // 執行交換
            swapContent(item, targetItem);
        });
    });

    // 個人圖片不添加點擊事件，或者添加一個空的回調函數（確保它沒有其他行為）
    if (profileImage) {
        profileImage.style.cursor = 'default'; // 將鼠標指針改回默認，表示不可點擊交換
        // profileImage.addEventListener('click', () => {
        //     console.log("個人圖片固定不動。");
        // });
    }
});