'use strict';
window.addEventListener('DOMContentLoaded', () => {
    // TAB
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    console.log(tabsContent);

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //TIMER
    const deadline = '2022-04-08';
    const element = document.querySelector('.promotion__descr');
    element.insertAdjacentHTML('beforeend', `Акция закончится ${deadline} в 00:00`);

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000 % 60));

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }

    setClock('.timer', deadline);

    // Modal window

    const btnsModal = document.querySelectorAll('[data-modal]'),
        modalWindow = document.querySelector('.modal');

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    btnsModal.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal();
        });
    });


    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });



    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);


    //Class

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.classes = classes;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            var element = document.createElement('div');
            if (this.classes.length > 0) {
                this.classes.forEach((className) => element.classList.add(className));
            } else {
                this.class = 'menu__item';
                element.classList.add(this.class);
            }

            element.innerHTML = `
                    <img src=${this.src} alt= ${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}"</h3>
                    <div class="menu__item-descr">${this.text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element);
        }

    }

    const getResourses = async (url) => { // async говорит о том, что внутри функции будет асинхронный код
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}: status: ${res.status}`);
        }

        return await res.json();
    };


    ////////////// ПЕРВЫЙ ВАРИАНТ ЗАПРОСА/////////////////

    // getResourses('http://localhost:3000/menu')
    // .then(data => {
    // data.forEach(({img, altimg, title, descr, price}) => {
    //     new MenuCard(img, altimg, title, descr, price,".menu .container").render();
    // });
    // });

    //////////////ВТОРОЙ ВАРИАНТ///////////////////

    // getResourses('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({
    //         img,
    //         altimg,
    //         title,
    //         descr,
    //         price
    //     }) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //         <img src=${img} alt= ${altimg}>
    //         <h3 class="menu__item-subtitle">${title}"</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>
    //         `;

    //         const container = document.querySelector('.menu .container').append(element);
    //     });
    // }

    ////////ТРЕТИЙ ВАРИАНТ ЗАПРОСА С ПОМОЩЬЮ AXIOS/////////////////////

    axios.get('http://localhost:3000/menu')
        .then(data => data.data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        }));


    // AJAX и общение с сервером

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => { // async говорит о том, что внутри функции будет асинхронный код
        const res = await fetch(url, { //ждет результата запроса и когда результат вернется await пропустит код дальше
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };




    // ПЕРЕДАЧА ДАННЫХ В ПРОСТОМ ФОРМАТЕ

    // function postData(form){
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         const statusMessage = document.createElement('div');
    //         statusMessage.classList.add('status');
    //         statusMessage.textContent = message.loading;
    //         form.append(statusMessage);

    //         const request = new XMLHttpRequest();

    //         request.open('POST', 'server.php');
    //         // request.setRequestHeader('Content-type', 'multipart/form-data');

    //         const formData = new FormData(form);

    //         request.send(formData);

    //         request.addEventListener('load', () => {
    //             if (request.status === 200) {
    //                 console.log(request.response);
    //                 statusMessage.textContent = message.success;
    //                 form.reset();
    //                 setTimeout(() => {
    //                     statusMessage.remove();
    //                 }, 3000);

    //             } else {
    //                 statusMessage.textContent = message.failure;
    //             }
    //         });
    //     });
    // }



    // ПЕРЕДАЧА ДАННЫХ  В ФОРМАТЕ JSON С ИСПОЛЬЗОВАНИЕМ XMLHTTPREQUEST

    // function bindPostData(form) {
    //     form.addEventListener('submit', (e) => {
    //         e.preventDefault();

    //         const statusMessage = document.createElement('img');
    //         statusMessage.setAttribute ('src', message.loading);
    //         statusMessage.style.cssText = `
    //             display: block;
    //             margin: 0 auto;
    //         `;

    //         form.insertAdjacentElement('afterend', statusMessage);

    //         const request = new XMLHttpRequest();

    //         request.open('POST', 'server.php');
    //         request.setRequestHeader('Content-type', 'application/json');

    //         const formData = new FormData(form);
    //         const object = {};

    //         formData.forEach(function (value, key) {
    //             object[key] = value;
    //         });

    //         const json = JSON.stringify(object);
    //         console.log(json);

    //         request.send(json);

    //         request.addEventListener('load', () => {
    //             if (request.status === 200) {
    //                 console.log(request.response);
    //                 showThanksModal(message.success);
    //                 form.reset()
    //                 statusMessage.remove();
    //             } else {
    //                 showThanksModal(message.failure);
    //             }
    //         });
    //     });
    // }

    // КРАСИВОЕ ОПОВЕЩЕНИЕ ПОЛЬЗОВАТЕЛЯ

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');

        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    };

    // FETCH. ПЕРЕДАЧА ДАННЫХ С ИСПОЛЬЗОВАНИЕМ FETCH и FORMDATA

    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     body: JSON.stringify({name: 'Alex'}),
    //     headers: {
    //         'Content-type': 'application/json'
    //     }
    // })
    // .then(response => response.json())
    // .then(json => console.log(json));

    //    fetch('https://jsonplaceholder.typicode.com/todos/1')
    //     .then(response => response.json())
    //     .then(json => console.log(json));

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.setAttribute('src', message.loading);
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            //Преобразование FormData в JSON примитивное
            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // }); 

            //Другой способ преобразовать formData в JSON  
            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });

        });
    }


    //ПОЛУЧЕНИЕ ДАННЫХ ИЗ БАЗЫ ДАННЫХ DB.JSON

    // fetch("http://localhost:3000/menu")
    // .then((data) =>  data.json())
    // .then(res => console.log(res));




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

    /////////////CAROUSEL SLIDER///////////////

    const slides = document.querySelectorAll('.offer__slide');
    const slider = document.querySelector('.offer__slider');
    const previous = document.querySelector('.offer__slider-prev');
    const next = document.querySelector('.offer__slider-next');
    const currentIndex = document.querySelector('#current');
    const totalIndex = document.querySelector('#total');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
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

    slidesField.style.width = 100 * slides.length +'%';
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
        dot.setAttribute('data-slide-to', i+1);
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


    next.addEventListener('click',() =>{
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        }else{
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

    previous.addEventListener('click',() =>{
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
            slideIndex = slides.length;
        }else{
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


});