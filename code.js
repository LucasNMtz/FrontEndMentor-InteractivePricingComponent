const discountSpan = document.querySelector(".discount-span");

const toggleBtn = document.querySelector(".toggle-btn-container");
const toggleBtnDisc = document.querySelector(".toggle-disc-btn");
const priceSpan = document.querySelector(".price-span");
const pageviewsNumberSpan = document.querySelector(".pageviews-number");

const sliderBtnDisc = document.querySelector(".slider-disc-btn");
const sliderBtnDiscShadow = document.querySelector(".slider-disc-btn-shadow");
const sliderBar = document.querySelector(".slider-bar");
const sliderBarFiller = document.querySelector(".slider-bar__btn-container");

const monthlyYearlySpan = document.querySelector(".monthly-yearly-span");
const pageviewsSpan = document.querySelector(".pageviews-span");

const prices = [8, 12, 16, 24, 36];
const discountPrices = [6, 9, 12, 18, 27];
let billingType = 0;
const pageviews = ["10k", "50k", "100k", "500k", "1M"];
const discTempMoves = [0, 25, 50, 75, 100];
let sliderStart = (window.innerWidth / 2) - (sliderBar.offsetWidth / 2);
let sliderEnd = (window.innerWidth / 2) + (sliderBar.offsetWidth / 2);
let sliderSegments = (sliderBar.offsetWidth / 8);
let sliderPosition = 2;
let dragging = false;

fadeInAnimation();

discountSpan.textContent = window.innerWidth >= 750 ? "25% discount" : "-25%";
window.addEventListener("resize", () => {
    discountSpan.textContent = window.innerWidth >= 750 ? "25% discount" : "-25%";
})

toggleBtn.addEventListener("click", () => {
    toggleBtnDisc.classList.toggle("toggle-disc-btn-monthly");
    let price = parseInt(priceSpan.textContent.replace("$", ""));
    if (!toggleBtnDisc.classList.contains("toggle-disc-btn-monthly")) {
        let index = prices.indexOf(price);
        priceSpan.textContent = `$${discountPrices[index].toFixed(2)}`;
        billingType = 1;
        fadeInAnimation();
    } else {
        let index = discountPrices.indexOf(price);
        priceSpan.textContent = `$${prices[index].toFixed(2)}`;
        billingType = 0;
        fadeInAnimation();
    }
})

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Mobile
    sliderBtnDisc.addEventListener("click", () => {
        if (sliderPosition === discTempMoves.length - 1) sliderPosition = 0;
        else sliderPosition++;
        sliderBarFiller.style.width = `${discTempMoves[sliderPosition]}%`;
        pageviewsNumberSpan.textContent = `${pageviews[sliderPosition]}`;
        if (billingType === 0) priceSpan.textContent = `$${prices[sliderPosition].toFixed(2)}`;
        else priceSpan.textContent = `$${discountPrices[sliderPosition].toFixed(2)}`;
        fadeInAnimation();
    })
} else {
    // Desktop PC
    sliderBtnDisc.addEventListener('mousedown', (e) => {
        dragging = true;
    });

    document.addEventListener("mousemove", (e) => {
        if (dragging) {
            sliderStart = (window.innerWidth / 2) - (sliderBar.offsetWidth / 2);
            sliderEnd = (window.innerWidth / 2) + (sliderBar.offsetWidth / 2);
            sliderSegments = (sliderBar.offsetWidth / 8);

            if (sliderStart <= e.clientX && sliderEnd >= e.clientX) {
                if ((sliderStart + sliderSegments * 3) <= e.clientX && (sliderEnd - sliderSegments * 3) >= e.clientX) {
                    sliderBtnDisc.style.left = `${sliderBarSize(discTempMoves[2])}px`;
                    sliderPosition = 2;
                }
                else if ((sliderStart + sliderSegments * 3) > e.clientX && (sliderStart + sliderSegments) <= e.clientX) {
                    sliderBtnDisc.style.left = `${sliderBarSize(discTempMoves[1])}px`;
                    sliderPosition = 1;
                }
                else if ((sliderEnd - sliderSegments * 3) < e.clientX && (sliderEnd - sliderSegments) >= e.clientX) {
                    sliderBtnDisc.style.left = `${sliderBarSize(discTempMoves[3])}px`;
                    sliderPosition = 3;
                }
                else if ((sliderEnd - sliderSegments) < e.clientX) {
                    sliderBtnDisc.style.left = `${sliderBarSize(discTempMoves[4])}`;
                    sliderPosition = 4;
                }
                else {
                    sliderBtnDisc.style.left = "0";
                    sliderPosition = 0;
                }
            }
            else if (sliderStart > e.clientX) {
                sliderBtnDisc.style.left = "0";
                sliderPosition = 0;
            }
            else {
                sliderBtnDisc.style.left = `${sliderBarSize(discTempMoves[4])}px`;
                sliderPosition = 4;
            }
        }
    })

    document.addEventListener("mouseup", () => {
        if (dragging) {
            sliderBtnDisc.style.left = "auto";
            sliderBarFiller.style.width = `${discTempMoves[sliderPosition]}%`;
            pageviewsNumberSpan.textContent = `${pageviews[sliderPosition]}`;
            if (billingType === 0) priceSpan.textContent = `$${prices[sliderPosition].toFixed(2)}`;
            else priceSpan.textContent = `$${discountPrices[sliderPosition].toFixed(2)}`;
            fadeInAnimation();
            dragging = false;
        }
    })
}

function sliderBarSize(percentage) {
    return (sliderBar.offsetWidth * (percentage / 100)) - (sliderBtnDisc.offsetWidth / 2);
}

function fadeInAnimation() {
    monthlyYearlySpan.classList.add("fade-in-animation");
    pageviewsSpan.classList.add("fade-in-animation");
    setTimeout(() => {
        monthlyYearlySpan.classList.remove("fade-in-animation");
        pageviewsSpan.classList.remove("fade-in-animation");
    }, 600)
}