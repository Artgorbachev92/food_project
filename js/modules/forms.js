import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    // AJAX и общение с сервером

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });
    
   


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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
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
}

// module.exports = forms;
export default forms;