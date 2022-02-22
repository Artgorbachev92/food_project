function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    /////////////CAROUSEL SLIDER///////////////

    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const previous = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const currentIndex = document.querySelector(currentCounter);
    const totalIndex = document.querySelector(totalCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        totalIndex.textContent = `0${slides.length}`;
        currentIndex.textContent = `0${slideIndex}`;
    } else {
        currentIndex.textContent = slideIndex;
        totalIndex.textContent = slides.length;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
`;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
    `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    };


    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += deleteNotDigits(width);
            slideIndex += 1;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slides.length < 10) {
            currentIndex.textContent = '0' + slideIndex;
        } else {
            currentIndex.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;

    });

    previous.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
            slideIndex = slides.length;
        } else {
            offset -= deleteNotDigits(width);
            slideIndex -= 1;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slides.length < 10) {
            currentIndex.textContent = '0' + slideIndex;
        } else {
            currentIndex.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if (slides.length < 10) {
                currentIndex.textContent = '0' + slideIndex;
            } else {
                currentIndex.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }


    /////////////////////////СОЗДАНИЕ СЛАЙДЕРА///////////////////

    ///////////////Простой слайдер////////////////////////
    // const slides = document.querySelectorAll('.offer__slide');
    // const previous = document.querySelector('.offer__slider-prev');
    // const next = document.querySelector('.offer__slider-next');
    // const currentIndex = document.querySelector('#current');
    // const totalIndex = document.querySelector('#total');
    // let slideIndex = 1;
    // showSlides(slideIndex);

    // if (slideIndex <= 9) {
    //     totalIndex.textContent = '0' + `${slides.length}`;
    // } else {
    //     totalIndex.textContent = `${slides.length}`;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }
    //     slides.forEach(slide => slide.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slideIndex <= 9){
    //         currentIndex.textContent = '0'+ `${slideIndex}`;
    //     } else {
    //         currentIndex.textContent = `${slideIndex}`;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // previous.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(+1); 
    // });
}

// module.exports = slider;
export default slider;