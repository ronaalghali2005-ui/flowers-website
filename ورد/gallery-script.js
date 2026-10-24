document.addEventListener('DOMContentLoaded', () => {
    const confirmButtons = document.querySelectorAll('.btn-confirm-ready');

    confirmButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.bouquet-card');
            const bouquetName = card.getAttribute('data-name');

            alert(`🎉 تم استلام طلبك لـ (${bouquetName}) بنجاح داخل النظام المبدئي للموقع!`);
        });
    });
});