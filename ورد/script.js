
const tabButtons = document.querySelectorAll('.tab-nav-btn');
const tabContents = document.querySelectorAll('.workspace-tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        
        
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
       
        btn.classList.add('active');
        document.getElementById(targetId).classList.add('active');
    });
});

const cards = document.querySelectorAll('.flower-card');

cards.forEach(card => {
    const images = card.querySelectorAll('.carousel-img');
    const colorText = card.querySelector('.color-text');
    const prevBtn = card.querySelector('.prev-arrow');
    const nextBtn = card.querySelector('.next-arrow');
    let currentIndex = 0;
    let autoInterval;

    function showSlide(index) {
        images[currentIndex].classList.remove('active');
        currentIndex = (index + images.length) % images.length;
        images[currentIndex].classList.add('active');
        
        const activeColor = images[currentIndex].getAttribute('data-color');
        colorText.textContent = activeColor;
    }

    nextBtn.addEventListener('click', () => {
        clearInterval(autoInterval); 
        showSlide(currentIndex + 1);
        startAutoPlay(); 
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoInterval);
        showSlide(currentIndex - 1);
        startAutoPlay();
    });

    function startAutoPlay() {
        autoInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 3500);
    }

    startAutoPlay();
});

const FLOWER_PRICE = 15;
const WRAPPING_PRICE = 15;
const liveTotalEl = document.getElementById('live-total');

function calculateLiveTotal() {
    let flowersCost = 0;
    
    cards.forEach(card => {
        const count = parseInt(card.querySelector('.count-number').textContent) || 0;
        flowersCost += count * FLOWER_PRICE;
    });

    let addonsCost = 0;
    document.querySelectorAll('input[name="addons"]:checked').forEach(cb => {
        addonsCost += parseInt(cb.getAttribute('data-price')) || 0;
    });

    const finalTotal = flowersCost + WRAPPING_PRICE + addonsCost;
    liveTotalEl.textContent = finalTotal;
    return finalTotal;
}

cards.forEach(card => {
    const plusBtn = card.querySelector('.plus-btn');
    const minusBtn = card.querySelector('.minus-btn');
    const countEl = card.querySelector('.count-number');

    plusBtn.addEventListener('click', () => {
        countEl.textContent = (parseInt(countEl.textContent) || 0) + 1;
        calculateLiveTotal();
    });

    minusBtn.addEventListener('click', () => {
        let current = parseInt(countEl.textContent) || 0;
        if (current > 0) {
            countEl.textContent = current - 1;
            calculateLiveTotal();
        }
    });
});

document.querySelectorAll('input[name="addons"]').forEach(input => {
    input.addEventListener('change', calculateLiveTotal);
});

const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const orderModal = document.getElementById('orderModal');
const modalOrderDetails = document.getElementById('modalOrderDetails');
const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');

const cardCheckbox = document.getElementById('card-addon-checkbox');
const cardTextContainer = document.getElementById('card-text-container');
const giftCardTextarea = document.getElementById('gift-card-text');

cardCheckbox.addEventListener('change', () => {
    if (cardCheckbox.checked) {
        cardTextContainer.classList.add('show');
        giftCardTextarea.focus();
    } else {
        cardTextContainer.classList.remove('show');
        giftCardTextarea.value = ''; 
    }
});

openModalBtn.addEventListener('click', () => {
    let flowersSummary = '';
    let hasFlowers = false;

    cards.forEach(card => {
        const count = parseInt(card.querySelector('.count-number').textContent) || 0;
        if (count > 0) {
            hasFlowers = true;
            const name = card.getAttribute('data-name');
         
            const activeImg = card.querySelector('.carousel-img.active');
            const color = activeImg.getAttribute('data-color');
            flowersSummary += `• ${name} (لون: ${color}) × العدد: ${count}<br>`;
        }
    });

    if (!hasFlowers) {
        alert('الرجاء اختيار وردة واحدة على الأقل لإعداد باقتك الأنيقة!');
        return;
    }

    const selectedPaper = document.querySelector('input[name="paper-type"]:checked').value;
    
   let selectedAddons = [];
    document.querySelectorAll('input[name="addons"]:checked').forEach(cb => {
        if(cb.id === 'card-addon-checkbox') {
         
            const message = document.getElementById('gift-card-text').value.trim();
            const textToShow = message ? `كرت إهداء بخط اليد (نص الرسالة: "${message}")` : `كرت إهداء بخط اليد (بدون نص)`;
            selectedAddons.push(textToShow);
        } else {
            selectedAddons.push(cb.value);
        }
    });
    let addonsText = selectedAddons.length > 0 ? selectedAddons.join('<br>• ') : 'لا يوجد';

    const finalPrice = calculateLiveTotal();

   
    modalOrderDetails.innerHTML = `
        <strong>💐 تفاصيل الورد المختار:</strong><br>
        ${flowersSummary}
        <br>
        <strong>🎁 غلاف الباقة الفاخر:</strong><br>
        • نوع الورق: ${selectedPaper}<br>
        <br>
        <strong>✨ الإضافات التنسيقية:</strong> ${addonsText}<br>
        <hr style="margin: 12px 0; border: none; border-top: 1px solid var(--primary-pink-soft);">
        <span style="font-size: 18px; font-weight: 700; color: var(--velvet-gold);">💰 السعر الإجمالي الكلي: ${finalPrice} د.ل</span>
    `;

    orderModal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    orderModal.classList.remove('active');
});

sendWhatsAppBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> تأكيد وإرسال الطلب';
sendWhatsAppBtn.style.backgroundColor = 'var(--velvet-gold)'; 

sendWhatsAppBtn.addEventListener('click', () => {
  
    orderModal.classList.remove('active');
    

    alert('💐 رائِع! تم اعتماد باقتك المخصصة بنجاح في واجهة المتجر الاستعراضية.');
    
   
    cards.forEach(card => card.querySelector('.count-number').textContent = '0');
    document.getElementById('live-total').textContent = '15'; 
    
    if (cardCheckbox.checked) {
        cardCheckbox.click(); 
    }
});