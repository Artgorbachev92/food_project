function cards() {
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

getResourses('http://localhost:3000/menu')
.then(data => {
data.forEach(({img, altimg, title, descr, price}) => {
    new MenuCard(img, altimg, title, descr, price,".menu .container").render();
});
});

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

// axios.get('http://localhost:3000/menu')
//     .then(data => data.data.forEach(({
//         img,
//         altimg,
//         title,
//         descr,
//         price
//     }) => {
//         new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
//     }));
}

module.exports = cards;