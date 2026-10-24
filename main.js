
document.addEventListener('DOMContentLoaded', () => {

    const readyBouquetsCard = document.getElementById('browse-ready-bouquets');
    const customBouquetCard = document.getElementById('design-custom-bouquet');

    if (readyBouquetsCard) {
        readyBouquetsCard.addEventListener('click', () => {
            window.location.href = 'ready-bouquets.html';
        });
    }

    if (customBouquetCard) {
        customBouquetCard.addEventListener('click', () => {
            window.location.href = 'custom-bouquet.html';
        });
    }
});