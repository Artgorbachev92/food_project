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

const getResourses = async (url) => { // async говорит о том, что внутри функции будет асинхронный код
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}: status: ${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getResourses};